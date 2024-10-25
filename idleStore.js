let shop = document.getElementById("shop");



// to store the selected items in basket
// retrieves data from local storage if there is data, if not
// it will only retrieve an empty array
let basket = JSON.parse(localStorage.getItem("data")) || [] ;

let generateShop =()=>{
    return (shop.innerHTML = shopItemsData.map((x)=>{
        let { id, name, price, desc, img } =x;
        // search function to search for item id 
        // to get the number of items in the cart
        // return empty array if cant find anything
        // if search.item is undefined, return 0. else, return search.item
        let search = basket.find((x) => x.id ===id) || []
        return `
        <div id=product-id-${id} class="item">
                <img width="222" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">
                            ${search.item === undefined? 0: search.item}
                            </div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join(""));
};

generateShop();

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

    // save data to local storage
    localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
    let search = basket.find((x)=> x.id === id );
    console.log(search.item);
    // update the number on the card
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

// function to display the total of items in cart
let calculation =()=>{
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x,y)=>x+y,0);
};

// calculation stays on the cart even though the page is refreshed
calculation();