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


