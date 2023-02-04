const axiosI = axios.create({
    baseURL: "https://crudcrud.com/api/83294fade41b46758a06b2756b1e01ec"
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

form,addEventListener("submit",storeDetails);
products.addEventListener("click",productAction);
// document.addEventListener("DOMContentLoaded",updateProductsList);



function storeDetails(e){
    e.preventDefault();
    let name = document.getElementById("p_name");
    let price = document.getElementById("p_price");

    axiosI.post("/products",{
        p_name: name.value,
        p_price: price.value
    })
    .then(setTimeout(updateProductsList,2000))
    .catch(err=>console.error(err));
}

function updateProductsList(){
    products.innerHTML = "";
    total.innerHTML = "";
    axiosI.get("/products")
    .then(res=>{
        let tempHTML = "";
        let totalprice = 0;
        for (let index = 0; index < res.data.length; index++) {
            const product = res.data[index];
            tempHTML = tempHTML + `<tr id="${product._id}">
            <th scope="row">${index+1}</th>
            <td>${product.p_name}</td>
            <td>${product.p_price}</td>
            <td>${btndelete}</td>
            </tr>`
            totalprice+=product.p_price;
        }
        products.innerHTML = tempHTML;
        total.innerHTML = totalprice
    })
    .catch(err=>console.error(err));
}

function productAction(e) {
    if (e.target.classList.contains("delete")){
        let selectedProduct = e.target.parentElement.parentElement;
        let target = "/products/"+selectedProduct.id;
        axiosI.delete(target)
        .then(setTimeout(updateProductsList,2000))
        .catch(err=>console.error(err));
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


