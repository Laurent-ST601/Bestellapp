function getMainDishesTemplate(index) {
    let dish = dishes[index];

    return `
        <table>
            <tr>
                <th>${dish.name}</th>
                <th><button onclick="addmenutobasket(${index})"  class="btn"></button></th>
            </tr>
            <tr>
                <td>${dish.price.toFixed(2)}€</td>
            </tr>
            <tr>
                <td>${dish.description}</td>
            </tr>
        </table>
        <br>
    `;
}

function getBasketTemplate(indexBasket) {
    let basketItem = basket[indexBasket];
    return `
        <div>
            <span>${basketItem.name} - ${basketItem.price.toFixed(2)}€</span>
            <br>
            <button class="plusbutton" onclick="increaseDishAmount(${indexBasket})"></button>
            <button class="minusbutton" onclick="decreaseDishAmount(${indexBasket})"></button>
            <br>
            <span>Menge: ${basketItem.amount}</span>
            <br>
            <button class="deletbutton" onclick="removeDishFromBasket(${indexBasket})"></button>
        </div>
    `;
}

