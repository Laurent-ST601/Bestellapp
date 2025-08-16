

let keys = Object.keys(mymenu, mydesirt, mydrinks);
let dishes = [];
let basket = [];

const SHIPPING_COST = 2.50; 
const FREE_SHIPPING_THRESHOLD = 25; 

function init() {
    loadDishes();
    renderDishes();
    renderBasekt()
}

function loadDishes() {
    
    const mainDishKeys = Object.keys(mymenu);
    for (let i = 0; i < mainDishKeys.length; i++) {
        let key = mainDishKeys[i];
        dishes.push({ ...mymenu[key], category: 'main' });
    }

    
    const dessertKeys = Object.keys(mydesirt);
    for (let i = 0; i < dessertKeys.length; i++) {
        let key = dessertKeys[i];
        dishes.push({ ...mydesirt[key], category: 'dessert' });
    }

    
    const drinkKeys = Object.keys(mydrinks);
    for (let i = 0; i < drinkKeys.length; i++) {
        let key = drinkKeys[i];
        dishes.push({ ...mydrinks[key], category: 'drink' });
    }
}

function renderDishes() {
    let mainDishesSection = document.getElementById('main_dishes_section');
    let dessertDishesSection = document.getElementById('dessert_dishes_section');
    let drinkDishesSection = document.getElementById('drink_dishes_section');

    mainDishesSection.innerHTML = "";
    dessertDishesSection.innerHTML = "";
    drinkDishesSection.innerHTML = "";

    for (let i = 0; i < dishes.length; i++) {
        let dish = dishes[i];
        let template = getMainDishesTemplate(i);
        if (dish.category === 'main') {
            mainDishesSection.innerHTML += template;
        } else if (dish.category === 'dessert') {
            dessertDishesSection.innerHTML += template;
        } else if (dish.category === 'drink') {
            drinkDishesSection.innerHTML += template;
        }
    }
}

function increaseDishAmount(index) {
    basket[index]['amount']++;
    renderBasekt();
}

function decreaseDishAmount(index) {
    if (basket[index]['amount'] > 1) {
        basket[index]['amount']--;
    } else {
        removeDishFromBasket(index);
    }
    renderBasekt();
}


function calculateTotal() {
    let subtotal = 0;
    for (let i = 0; i < basket.length; i++) {
        subtotal += basket[i].price * basket[i].amount;
    }

    let total = subtotal;
    let shippingCost = 0;

    if (subtotal < FREE_SHIPPING_THRESHOLD) {
        total += SHIPPING_COST;
        shippingCost = SHIPPING_COST;
    }

    return {
        subtotal: subtotal.toFixed(2),
        shippingCost: shippingCost.toFixed(2),
        total: total.toFixed(2)
    };
}

function getBasketTemplate(indexBasket) {
    let basketItem = basket[indexBasket];
    return `
        <div>
            <span>${basketItem.name} - ${basketItem.price.toFixed(2)}€</span>
            <button onclick="increaseDishAmount(${indexBasket})">+</button>
            <button onclick="decreaseDishAmount(${indexBasket})">-</button>
            <span>Menge: ${basketItem.amount}</span>
            <button class="deletbutton" onclick="removeDishFromBasket(${indexBasket})"></button>
        </div>
    `;
}



function removeDishFromBasket(index) {
    basket.splice(index, 1);
    renderBasekt();
}

// function renderBasekt() {
//     let myBasket = document.getElementById('addmenutobasket');
//     myBasket.innerHTML = "";



//     for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
//         myBasket.innerHTML += getBasketTemplate(indexBasket);
//     }
// }

function order() {
    alert('Ihre Bestellung wurde erfolgreich aufgegeben!');
    basket = [];
    renderBasekt();
}

function addmenutobasket(basketAddIndex) {
    let dish = dishes[basketAddIndex];
    let existingDishIndex = basket.findIndex(item => item.name === dish.name);

    if (existingDishIndex > -1) {
        basket[existingDishIndex].amount++;
    } else {
        dish.amount = 1;
        basket.push(dish);
    }

    renderBasekt();
}

function toggleBasketOverlay() {
    const basketOverlay = document.querySelector('.basket-wrapper');
    const mobileButton = document.querySelector('.responsive-basket-btn');

    // Umschalten der 'active' Klasse für das Overlay
    basketOverlay.classList.toggle('active');

    // Umschalten der 'hidden' Klasse für den mobilen Button
    mobileButton.classList.toggle('hidden');
}


function renderBasekt() {
    let myBasket = document.getElementById('addmenutobasket');
    myBasket.innerHTML = ''; 

    
    myBasket.innerHTML += `<button class="close-overlay-btn" onclick="toggleBasketOverlay()">Back</button>`;

    if (basket.length === 0) {
        myBasket.innerHTML += `
            <p>Dein Warenkorb ist noch leer.</p>
        `;
        document.getElementById('totalPriceMobile').innerText = '0,00 €'; 

    } else {
        for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
            myBasket.innerHTML += getBasketTemplate(indexBasket);
        }

        let totals = calculateTotal();
        document.getElementById('totalPriceMobile').innerText = `${totals.total} €`;

        myBasket.innerHTML += `
            <div class="basket-total">
                <hr>
                <div><span>Zwischensumme:</span><span>${totals.subtotal}€</span></div>
                <div><span>Lieferkosten:</span><span>${totals.shippingCost}€</span></div>
                <div><span><b>Gesamt:</b></span><span><b>${totals.total}€</b></span></div>
                <button class="basketpay" onclick="order()">Bestellen</button>
            </div>
        `;
    }
}