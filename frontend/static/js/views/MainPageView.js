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
    <!-- <h2 class="recipe-header">Recipe List
        <button class="add-to-recipe-button" type="submit">
            <i class="fas fa-plus-square"></i>
        </button>
    </h2> -->
    <section class="recipe-section">
        <ul class="recipe-list">
            <li>
                <a href="/recipes" class="nav__link" data-link>Recipes</a>
            </li>
        </ul>
    </section>
        `;
    }
}

