const axiosI = axios.create({
    baseURL: "https://crudcrud.com/api/c1823653118144a19859112bea606dab"
  });


axiosI.interceptors.request.use(config=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config;
}, error=>{
  return Promise.reject(error);
})


let form = document.getElementById("product-details");
let products = document.getElementById("products");
let btndelete ="<button class='btn btn-danger btn-sm float-right delete'>DeleteProdcut</button>"
let total = document.getElementById("total_amt");

form.addEventListener("submit",storeDetails);
products.addEventListener("click",productAction);
document.addEventListener("DOMContentLoaded",updateProductsList);



async function storeDetails(e){
    e.preventDefault();
    let name = document.getElementById("p_name");
    let price = document.getElementById("p_price");
    try {
        await axiosI.post("/products",{
            p_name: name.value,
            p_price: price.value
        })   
    } catch (error) {
        console.error(error);
    }
    updateProductsList();
}

async function updateProductsList(){
    products.innerHTML = "";
    total.innerHTML = "";
    try{
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
            totalprice+=product.p_price;
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
        let selectedProduct = e.target.parentElement.parentElement;
        let target = "/products/"+selectedProduct.id;
        try {
            await axiosI.delete(target)
        } catch (error) {
            console.error(eroor);
            
        }
        updateProductsList();
    }
    
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


