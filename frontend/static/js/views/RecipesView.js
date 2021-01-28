import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.recipeId = params.id;
        this.setTitle("Recipes View");
    }

    async getHtml() {

        switch (this.recipeId) {
            case 'dessert':
                return bananaRecipe;
                break;
            case 'pasta':
                return pastaRecipe;
                break;
        }
    }
}

const pastaRecipe = `
<body>
<div class="root">
<div class="recipe-box-wrapper">
    <div class="content-recipe">
        <div class="recipe-view">
            <div class="recipe-title">
                <div class="recipe-view-name title-row">Pasta</div>
                <div class="title-row">
                    <button class="recipe-delete-button">
                        <i class="fa fa-trash"></i>
                    </button>
                    <button class="recipe-edit-button">
                        <i class="fas fa-edit"></i>
                    </button>
                </div>
            </div>
            <div class="recipe-body">
                <h4>Ingredients:</h4>
                <ul class="ingredient list">
                    <li>2 tablespoons butter</li>
                    <li>2 cloves garlic, minced</li>
                    <li>1 cup heavy cream</li>
                    <li>3/4 teaspoon salt</li>
                    <li>1 teaspoon fresh-ground black pepper</li>
                    <li>2 1/2 cups canned, drained artichoke hearts (two 14-ounce cans), rinsed and cut into
                        halves or quarters</li>
                    <li>3/4 pound fusilli</li>
                    <li>1/2 cup grated Parmesan cheese</li>
                    <li>2 tablespoons chopped chives, scallion tops, or parsley</li>
                </ul>
                <h4>Directions:</h4>
                <ol class="directions list">
                    <li>In a medium saucepan, melt the butter over moderately low heat. Add the garlic and cook
                        for 30 seconds. Stir in the cream, salt, pepper, and artichoke hearts. Cook until just
                        heated through, about 3 minutes.</li>
                    <li>In a large pot of boiling, salted water, cook the fusilli until just done, about 13
                        minutes. Drain the pasta and toss with the cream sauce, Parmesan, and chives.</li>
                </ol>
            </div>
        </div>

    </div>
    <div class="recipe-add-button-div">
        <button id="add-recipe-button">
            <i class="fa fa-plus-square"></i>
        </button>
    </div>
</div>
</div>
</body>
`;

const bananaRecipe = `banana recipe`;
