import { menuArray } from "./data/data.js";

const orderData = [];
let orderTotal = 0;


document.addEventListener("click", (e) => {
    console.log(e.target)
    // e.target =
    const complete = document.getElementById('order-complete')
    const checkoutModal = document.getElementById("modal")
    const yourOrder = document.getElementById("your-order");
    let addBtnTarget = e.target.classList[0];
    let removeBtnTarget = e.target.parentElement.parentElement
    let completeOrder = e.target.id
    let childNode = e.target.parentElement
    if (addBtnTarget === "add-btn") {
        renderOrder(Number(e.target.parentElement.id));
        complete.classList.add('hidden')
        
        // console.log(e.target.parentElement.id)
    }
    if (removeBtnTarget.id === "order-details") {
        removeFromOrder(removeBtnTarget, childNode)
    }
    if (completeOrder === 'complete-order') {
        console.log('it works!')
        displayCheckoutModal()
    }
    if (e.target.id === 'pay-btn') {
        e.preventDefault()
        orderData.forEach(el => orderData.pop())
        orderTotal = 0
        checkoutModal.classList.add('hidden')
        yourOrder.classList.add('hidden')
        complete.classList.remove('hidden')
    }

    // console.log(removeBtnTarget)
});


const displayCheckoutModal = () => {
    const checkoutModal = document.getElementById("modal")
    checkoutModal.classList.remove('hidden')
}

const renderOrder = (id) => {
    const yourOrder = document.getElementById("your-order");
    const orderDetails = document.getElementById("order-details")
    const totalPrice = document.getElementById('total-price')
    const itemObj = menuArray.filter(el => el.id === id)[0]
    let html = `
        <div>
            <li>${itemObj.name}</li>
            <button>remove</button>
            <p>${itemObj.price}</p>
        </div>`
    orderTotal += itemObj.price
    orderData.push(html)
    totalPrice.innerHTML = orderTotal
    orderDetails.innerHTML = orderData.join('');
    yourOrder.classList.remove("hidden");

};

const removeFromOrder = (parentEl, childNode) => {
    const yourOrder = document.getElementById("your-order");
    const orderDetails = document.getElementById("order-details")
    const totalPrice = document.getElementById('total-price')
    const priceOfOrder = Number(childNode.children[2].textContent)
    orderTotal -= priceOfOrder
    totalPrice.innerHTML = orderTotal
    const indexOfChild = Array.prototype.indexOf.call(parentEl.children, childNode);
    orderData.splice(indexOfChild, 1)
    orderDetails.innerHTML = orderData.join('');
    if (parentEl.children.length === 0) {
        yourOrder.classList.add('hidden')
    }
}

const renderMenuFromData = () => {
    const html = menuArray
        .map(
            ({ name, id, ingredients, price }) => `
        <div class="container">
            <div class="item" id="${id}">
                <img src="images/${name}.png" alt="" class="item-img">

                <div class="item-text"">
                    <h2 class="item-name">${name}</h2>
                    <p class="item-ingredients">${ingredients.join(", ")}</p>
                    <h3 class="item-price">$${price}</h3>
                </div>
                <button class="add-btn">
                    +
                </button>
            
            </div>
        </div>`
        )
        .join("");
    document.getElementById("menu").innerHTML = html;
};

renderMenuFromData();
