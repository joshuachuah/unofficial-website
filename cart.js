let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");
console.log(shopItemsData);

let basket = JSON.parse(localStorage.getItem("data")) || [] ;

// function to display the total of items in cart
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0);
};

// calculation stays on the cart even though the page is refreshed
calculation();

let generateCartItems = () => {
    // if basket length is not 0, run code
    if (basket.length !== 0){
        return (ShoppingCart.innerHTML = basket.map((x)=>{
            let { id, item } = x;
            let search = shopItemsData.find((y)=>y.id === id ) || [];
            return `
            <div class="cart-item">
                <img width="150" src="${search.img}" alt="" />
                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${search.name}</p>
                            <p class="cart-item-price">$ ${search.price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div> 
                    <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    <h3>$ ${Math.round((item * search.price)*100)/100}</h3> 
                </div>
            </div>
            `;
            }).join(""));
    }else{
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="./idleStore.html">
            <button class="HomeBtn">Back to home</button>
        </a>    
        `;
    };
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    // search whether or not the object exist in the basket
    let search = basket.find((x)=> x.id === selectedItem.id);
    //if else statement for search
    if(search === undefined){
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }else{
       search.item += 1; 
    }

    // console.log(basket);
    update(selectedItem.id);
    generateCartItems();
    // save data to local storage
    localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
    let selectedItem = id;
    // search whether or not the object exist in the basket
    let search = basket.find((x)=> x.id === selectedItem.id);

    // if there are no items to in the basket to 
    // begin with, return nothing in console
    if (search === undefined) return;

    // if no items is found in basket, return 0,
    // else, deduct item from basket
    else if(search.item === 0) return;
    else{
        search.item -= 1; 
    }


    // console.log(basket); 
    update(selectedItem.id);

    // filter the item that has a zero, and removes 
    // the object that has 0 items in the basket
    // in local storage
    basket = basket.filter((x) => x.item !== 0);
    generateCartItems();
    // save data to local storage
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x)=> x.id === id );
    console.log(search.item);
    // update the number on the card
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

let removeItem = (id) =>{
    let selectedItem = id;
    basket = basket.filter((x)=>x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();
    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () =>{
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

let totalAmount = () =>{
    if(basket.length !== 0){
        let amount = basket.map((x)=>{
            let {item, id} = x;
            let search = shopItemsData.find((y)=>y.id === id ) || [];
            return item * search.price;
        })
        .reduce((x,y)=>x+y,0);
        label.innerHTML =`
        <h2>Total Bill: $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onlick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    }else return; 
}

totalAmount();