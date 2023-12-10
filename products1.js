let itemsel1=document.querySelector(".elements1")
let cartsel=document.querySelector(".cartitems")
let subtotalsel=document.querySelector(".subtotal")
let totalsel=document.querySelector(".btn-white span")
let items1=[
    {
        id:10,
        image:"face-wash-300x300",
        category:"Groceries",
        Name:"Organic Face Scrub",
        Price:35.00,
        stock:10,
        qty:0
    },
    {
        id:11,
        image:"pulses-300x300",
        category:"Groceries",
        Name:"Pulses From Organic Farm",
        Price:25.00,
        stock:9,
        qty:0
    },
    {
        id:12,
        image:"wheat-300x300",
        category:"Groceries",
        Name:"Wheat From Organic Farms ",
        Price:25.00,
        stock:8,
        qty:0
    }



]
function displayitems1()
{
itemsel1.innerHTML+=items1.map((prod,index)=>{
return (`

<div class="card" style="width:16rem;">
<img src="images/${prod.image}.jpg" class="card-img-top" alt="...">
<div class="card-body text-center"><h5 class="card-title text-muted">${prod.category}</h5>
<h5 class="card-title">${prod.Name}</h5>
<p class="card-text">
<i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i><i class="fa-regular fa-star"></i>
</p>
<div class="d-flex ">
<h6 class="flex-grow-1 text-start"> £${prod.Price}</h6>
<button type="button" class="btn btn-success" onclick="addtocart(${prod.id})"><i class="fa-solid fa-cart-shopping"></i></button>
</div>
</div>
</div>

`) })
}
displayitems1()
let cart= JSON.parse(localStorage.getItem("CART")) || [];

updatecart();
function addtocart(id)

{
    // check if product alredy exist
    if(cart.some((item)=>item.id===id))
    {
        changeqty("plus",id);

    }
    else{
        const item = items1.find((product)=> product.id===id);
        cart.push({
            ...item,
            qty:1
        });

    }
    updatecart();


}
function updatecart()
{
    rendercartitems();
    rendersubtotal();
    localStorage.setItem("CART",JSON.stringify(cart));
}
function rendercartitems()
{
    cartsel.innerHTML="";
    cart.forEach((item) => {
        cartsel.innerHTML+=
        `<table class"table w-100">
        <tbody>
        <tr><td><img src="images/${item.image}.jpg" height=50 width=50></td>
        <td><p style="font-size:13px;">${item.Name}</p></td>
        <td>$${item.Price}</td>
        <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16" onclick="changeqty('minus',${item.id})">
        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
        <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
      </svg>      ${item.qty}      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" onclick="changeqty('plus',${item.id})">
      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
    </svg></td>
    <td><i class="fa-solid fa-trash text-primary" onclick="removeitem(${item.id})"></i>
    </td></tr></tbody></table>`
    });
}
function changeqty(action,id)
{
    cart=cart.map((item)=>{
        let qty=item.qty;
        if(item.id===id)
        {
         if (action==='minus' && qty>1)
         {
            qty--;
         }
         else if(action==='plus' && qty<item.stock)
         {
            qty++
         }
        }
        return{
            ...item,
            qty,
        };
    })
    updatecart();
}
function rendersubtotal()
{
    let totalprice=0,totalitems=0;
    cart.forEach((item)=>{
        totalprice+=item.Price*item.qty;
        totalitems+=item.qty;

    });
    subtotalsel.innerHTML=`Subtotal(${totalitems} items):$${totalprice.toFixed(2)}`
    totalsel.innerHTML=totalitems;
}
function removeitem(id)
{
    cart=cart.filter((item)=>item.id!==id);
    updatecart();
}