function getMainDishesTemplate(dish) {
  
    return `
        <table>
            <tr>
                <th>${dish.name}</th>
                <th>
                    
                    <button onclick="addmenutobasket('${dish.id}')" class="btn"></button>
                </th>
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

function getBasketTemplate(basketItem) {
    return `
        <div>
            <span>${basketItem.name} - ${basketItem.price.toFixed(2)}€</span>
            <br>
            <!-- Nutzt die ID des Warenkorb-Elements -->
            <button class="plusbutton" onclick="increaseDishAmount('${basketItem.id}')"></button>
            <button class="minusbutton" onclick="decreaseDishAmount('${basketItem.id}')"></button>
            <br>
            <span>Menge: ${basketItem.amount}</span>
            <br>
            <button class="deletbutton" onclick="removeDishFromBasket('${basketItem.id}')"></button>
        </div>
    `;
}
