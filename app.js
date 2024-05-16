import { menuArray } from './data/data.js'

console.log(menuArray)


const renderMenuFromData = () => {
    const html = menuArray.map(({name, id, ingredients, price}) => `
        <div class="container">
            <div class="item">
                <img src="images/${name}.png" alt="" class="item-img">

                <div class="item-text" id="${id}">
                    <h2 class="item-name">${name}</h2>
                    <p class="item-ingredients">${ingredients.join(', ')}</p>
                    <h3 class="item-price">$${price}</h3>
                </div>
                <button class="add-btn">
                    +
                </button>
            
            </div>
        </div>`).join('')
    document.getElementById('menu').innerHTML = html

}

renderMenuFromData();