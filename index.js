const axiosI = axios.create({
    baseURL: "https://crudcrud.com/api/22b4b83b539d4bb49ba0c6df1e83506a"
  });


axiosI.interceptors.request.use(config=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config;
}, error=>{
  return Promise.reject(error);
})


let form = document.getElementById("product-details");
let products = document.getElementById("products");
let btndelete ="<button class='btn btn-danger btn-sm float-right delete'>Delete Prodcut</button>"
let total = document.getElementById("total_amt");

let btndelteNode = document.createElement("button");
btndelteNode.classList = "btn btn-danger btn-sm float-right delete";
btndelteNode.appendChild(document.createTextNode("Delete Product"))

form.addEventListener("submit",storeDetails);
products.addEventListener("click",productAction);
document.addEventListener("DOMContentLoaded",updateProductsList);

var count =  0

async function storeDetails(e){
    try {
    e.preventDefault();
    let name = document.getElementById("p_name");
    let price = document.getElementById("p_price");
        let res = await axiosI.post("/products",{
            p_name: name.value,
            p_price: price.value
        })
        let row = makeNewRow(name.value , price.value , res.data._id);
        products.appendChild(row);
        count++;
    } catch (error) {
        console.error(error);
    }
    
}

async function updateProductsList(){
    try{
    products.innerHTML = "";
    total.innerHTML = "";
    const productList = await axiosI.get("/products")
        let tempHTML = "";
        let totalprice = 0;
        for (let index = 0; index < productList.data.length; index++) {
            const product = productList.data[index];
            tempHTML = tempHTML + 
            `<tr id="${product._id}">
            <th scope="row">${index+1}</th>
            <td>${product.p_name}</td>
            <td>${product.p_price}</td>
            <td>${btndelete}</td>
            </tr>`
            totalprice+=parseInt(product.p_price);
            count++;
        }
        products.innerHTML = tempHTML;
        total.innerHTML = totalprice
    }
    catch(e){
        console.error(e);
    }
}

async function productAction(e) {
    if (e.target.classList.contains("delete")){
        try {
        let selectedProduct = e.target.parentElement.parentElement;
        let target = "/products/"+selectedProduct.id;
            await axiosI.delete(target)
            products.removeChild(selectedProduct);
        } catch (error) {   
            console.error(error);
            
        }
        // updateProductsList();
    }
    
}

function makeNewRow(name , price , id){
    let row = document.createElement("tr");
    row.setAttribute("id",id);
    
    let th =document.createElement("th")
    th.setAttribute("scope","row")
    th.appendChild(document.createTextNode(`${count+1}`));
    row.appendChild(th);
    let nameNode = document.createElement("td");
    nameNode.appendChild(document.createTextNode(`${name}`));
    row.appendChild(nameNode);
    let priceNode = document.createElement("td");
    priceNode.appendChild(document.createTextNode(`${price}`));
    row.appendChild(priceNode);
    row.appendChild(document.createElement("td").appendChild(btndelteNode).cloneNode(true));
    return row;

}

// function updateProductsListTest(){
//     products.innerHTML = "";
//     total.innerHTML = "";
//         let tempHTML = "";
//         let totalprice = 0;
//         let res = [
//             {
//                 _id:"12345678",
//                 p_name:"test",
//                 p_price:100000
//             }
//         ]
//         for (let index = 0; index < res.length; index++) {
//             const product = res[index];
//             tempHTML = tempHTML + `<tr id="${product._id}">
//             <th scope="row">${index+1}</th>
//             <td>${product.p_name}</td>
//             <td>${product.p_price}</td>
//             <td>${btndelete}</td>
//             </tr>`
//             totalprice+=product.p_price;
//         }
//         products.innerHTML = tempHTML;
//         total.innerHTML = totalprice
// }
// updateProductsListTest();


