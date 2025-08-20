let keys = Object.keys(mymenu, mydesirt, mydrinks);
let dishes = [];
let basket = [];
let nextDishId = 0;

const SHIPPING_COST = 2.50;
const FREE_SHIPPING_THRESHOLD = 25;

function init() {
    loadDishes();
    renderDishes();
    renderBasekt();
}


function addDishesFromMenu(menu, category) {
    const keys = Object.keys(menu);
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        
        dishes.push({ ...menu[key], id: `${category}-${nextDishId++}`, category: category });
    }
}

function loadDishes() {
    addDishesFromMenu(mymenu, 'main');
    addDishesFromMenu(mydesirt, 'dessert');
    addDishesFromMenu(mydrinks, 'drink');
}

function increaseDishAmount(dishId) {
    let existingDish = basket.find(item => item.id === dishId);
    if (existingDish) {
        existingDish.amount++;
        renderBasekt();
    }
}

function decreaseDishAmount(dishId) {
    let existingDish = basket.find(item => item.id === dishId);
    if (existingDish && existingDish.amount > 1) {
        existingDish.amount--;
    } else if (existingDish) {
        removeDishFromBasket(dishId);
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

function removeDishFromBasket(index) {
    basket.splice(index, 1);
    renderBasekt();
}


function order() {
    alert('Ihre Bestellung wurde erfolgreich aufgegeben!');
    basket = [];
    renderBasekt();
}

function addmenutobasket(dishId) {
    
    let dish = dishes.find(d => d.id === dishId);
    if (!dish) return; 

    let existingDish = basket.find(item => item.id === dishId);

    if (existingDish) {
        existingDish.amount++;
    } else {
        
        let newDish = { ...dish, amount: 1 };
        basket.push(newDish);
    }

    renderBasekt();
}
function toggleBasketOverlay() {
    const basketOverlay = document.querySelector('.basket-wrapper');
    const mobileButton = document.querySelector('.responsive-basket-btn');
   
    basketOverlay.classList.toggle('active');

   
    mobileButton.classList.toggle('hidden');
}

function renderBasekt() {
    let myBasket = document.getElementById('addmenutobasket');
    myBasket.innerHTML = `<button class="close-overlay-btn" onclick="toggleBasketOverlay()">Back</button>`;

    if (basket.length === 0) {
        renderEmptyBasket(myBasket);
    } else {
        renderBasketItems(myBasket);
        renderBasketTotals(myBasket);
    }
}

function renderEmptyBasket(myBasket) {
    myBasket.innerHTML += `
        <p>Dein Warenkorb ist noch leer.</p>
    `;
    document.getElementById('totalPriceMobile').innerText = '0,00 €';
}

function renderBasketItems(myBasket) {
    for (let i = 0; i < basket.length; i++) {
        myBasket.innerHTML += getBasketTemplate(basket[i]);
    }
}

function renderBasketTotals(myBasket) {
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