import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Main Page");
    }

    async getHtml() {
        return `
        <form>
        <input type="text" class="item-input" />
        <button class="add-to-list-button" type="submit">
            <i class="fas fa-plus-square"></i>
        </button>
        <div class="select">
            <select name="shopping-items" class="filter-shopping-list">
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="uncompleted">Uncompleted</option>
            </select>
        </div>
    </form>
    <h2>Ingredients Needed:</h2>
    <section>
        <ul class="ingredient-list"></ul>
    </section>
    <h2>Shopping List</h2>
    <section>
        <ul class="shopping-list"></ul>
    </section>
    <h2>
        <a href="/recipes" class="nav__link" data-link>Recipes</a>
    </h2>
        `;
    }
}

window.onload = loadScriptforMainPage

function loadScriptforMainPage() {

    //DOM Elements

    const itemInput = document.querySelector('.item-input')
    const addToIngrBtn = document.querySelector('.add-to-list-button')
    const ingredientsList = document.querySelector('.ingredient-list')
    const addToShopBtn = document.querySelector('.add-button')
    const shoppingList = document.querySelector('.shopping-list')
    const filterOption = document.querySelector('.filter-shopping-list')

    //Event Listeners

    addToIngrBtn.addEventListener('click', addItemToIngredientsList)
    ingredientsList.addEventListener('click', addItemToShoppingList)
    shoppingList.addEventListener('click', deleteItemFromShoppingList)
    filterOption.addEventListener('click', filterShoppingList)

    //Error Messages
    const WRONG_INPUT = "You cannot add empty fields or numbers"
    const INGREDIENT_DUPLICATE = "This item is already in the ingredients list"
    const SHOPPING_DUPLICATE = "This item is already in the shopping list"


    //functions

    function addItemToIngredientsList(event) {
        event.preventDefault()

        const ingredientItems = Array.from(document.querySelectorAll('.ingredient-item-li'))

        if (itemInput.value === "" || (!isNaN(itemInput.value))) {
            alert(WRONG_INPUT)
            resetInputValue()
        } else if (itemAlreadyExists(ingredientItems, itemInput)) {
            alert(INGREDIENT_DUPLICATE)
            resetInputValue()
            return
        } else {
            createIngredientsDiv()
            addQuantityEvent()
        }
    }

    function addItemToShoppingList(event) {
        const clickedBtn = event.target
        if (clickedBtn.classList[0] === 'add-button') {
            const ingredientItems = Array.from(document.querySelectorAll('.ingredient-item-li'))
            const shoppingItems = Array.from(document.querySelectorAll('.shopping-item-li'))
            if (isDuplicate(ingredientItems, shoppingItems)) {
                alert(SHOPPING_DUPLICATE)
                return
            } else {
                createShoppingDiv(clickedBtn)
            }
        }
        deleteItemFromBothLists(clickedBtn)
    }


    function addQuantityToShoppingList(clickedBtn, shoppingDiv) {
        if (clickedBtn.classList[0] === 'add-button') {
            const ingredientQuantity = clickedBtn.previousSibling.value
            const shoppingQuantity = document.createElement('input')
            shoppingQuantity.classList.add('quantity-shopping')
            shoppingQuantity.setAttribute('type', 'number')
            if (ingredientQuantity > 0) {
                shoppingQuantity.setAttribute('value', ingredientQuantity)
                shoppingDiv.appendChild(shoppingQuantity)
                createButtonElement('button', '<i class="fas fa-check"></i>', 'check-button', shoppingDiv)
                createButtonElement('button', '<i class="fas fa-trash"></i>', 'trash-button', shoppingDiv)
                shoppingList.appendChild(shoppingDiv)
            } else {
                alert("Quantity cannot be less than 1")
            }
        }
    }


    function deleteItemFromBothLists(clickedBtn) {
        if (clickedBtn.classList[0] === 'trash-button') {
            const item = clickedBtn.parentElement.firstChild
            const shoppingDiv = document.querySelectorAll('.shopping-item')
            const ingredientsDiv = document.querySelectorAll('.ingredient-item')

            removeChildren(shoppingList, shoppingDiv, item)
            removeChildren(ingredientsList, ingredientsDiv, item)
        }
    }


    function deleteItemFromShoppingList(event) {
        const clickedItem = event.target
        if (clickedItem.classList[0] === 'trash-button') {
            const div = clickedItem.parentElement
            div.classList.add('fall')
            div.addEventListener('transitionend', () => {
                div.remove()
            })
        }
        if (clickedItem.classList[0] === 'check-button') {
            const div = clickedItem.parentElement
            div.classList.toggle('checked')
        }
    }

    function updateShoppingQuantity(event) {
        var changedQuantity = event.target
        var shoppingItems = document.querySelectorAll('.quantity-shopping')
        if (changedQuantity.value > 0) {
            shoppingItems.forEach(shoppingItem => {
                var ingredient = changedQuantity.previousSibling.innerText
                if (shoppingItem.previousSibling.innerText === ingredient)
                    shoppingItem.value = changedQuantity.value
            })
        }
    }


    function createButtonElement(elementType, awesomeClass, classToAdd, divToBeAppendedTo) {
        const button = document.createElement(elementType)
        button.innerHTML = awesomeClass
        button.classList.add(classToAdd)
        divToBeAppendedTo.appendChild(button)
    }

    function createQuantityElement(elementType, classToAdd, divToBeAppendedTo) {
        const quantity = document.createElement(elementType)
        quantity.classList.add(classToAdd)
        quantity.setAttribute('type', 'number')
        quantity.setAttribute('value', '1')
        divToBeAppendedTo.appendChild(quantity)
    }

    function createIngredientsDiv() {
        const ingredientsDiv = document.createElement('div')
        ingredientsDiv.classList.add('ingredient-item')
        const ingredientItem = document.createElement('li')
        ingredientItem.classList.add("ingredient-item-li")
        ingredientItem.innerText = itemInput.value
        ingredientsDiv.appendChild(ingredientItem)

        createQuantityElement('input', 'quantity', ingredientsDiv)
        createButtonElement('button', '<i class="fas fa-plus-square"></i>', 'add-button', ingredientsDiv)
        createButtonElement('button', '<i class="fas fa-trash"></i>', 'trash-button', ingredientsDiv)

        ingredientsList.appendChild(ingredientsDiv)
    }

    function createShoppingDiv(clickedBtn) {
        const shoppingDiv = document.createElement('div')
        shoppingDiv.classList.add('shopping-item')
        const shoppingItem = document.createElement('li')
        shoppingItem.classList.add("shopping-item-li")
        const ingredientItem = clickedBtn.parentElement.firstChild
        shoppingItem.innerText = ingredientItem.innerText
        shoppingDiv.appendChild(shoppingItem)
        addQuantityToShoppingList(clickedBtn, shoppingDiv)
    }

    function removeChildren(parent, children, item) {
        if (parent.hasChildNodes()) {
            [...children].forEach(child => {
                if (child.innerText === item.innerText) {
                    parent.removeChild(child)
                }
            })
        }
    }

    function itemAlreadyExists(arr, item) {
        const found =
            arr.find(elem =>
                elem.innerText === item.value);
        return found
    }

    function resetInputValue() {
        itemInput.value = ""
    }

    function addQuantityEvent() {
        var allQuantityInputs = Array.from(ingredientsList.getElementsByClassName('quantity'))
        allQuantityInputs.forEach(quantityInput => {
            quantityInput.addEventListener('change', updateShoppingQuantity)
            resetInputValue()
        })
    }

    function isDuplicate(arr1, arr2) {
        const found = arr1.every(elemArr1 =>
            arr2.find(elemArr2 =>
                elemArr2.innerText === elemArr1.innerText))
        return found
    }

    function filterShoppingList(e) {
        const shopItems = shoppingList.childNodes;
        shopItems.forEach(function (shopItem) {
            console.log(shopItem)
            switch (e.target.value) {
                case "all":
                    shopItem.style.display = "flex";
                    break;
                case "completed":
                    if (shopItem.classList.contains("checked")) {
                        shopItem.style.display = "flex";
                    } else {
                        shopItem.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!shopItem.classList.contains("checked")) {
                        shopItem.style.display = "flex";
                    } else {
                        shopItem.style.display = "none";
                    }
            }
        });
    }
}


