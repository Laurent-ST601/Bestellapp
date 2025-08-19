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