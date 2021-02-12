import AbstractView from "./AbstractView.js";
import { addRecipe, arr, deleteRecipe, editStoreRecipe } from './store.js';

export default class extends AbstractView {
    templateUrl = "/static/js/views/recipesView.html"
    constructor(params) {
        super(params);
        // this.recipeId = params.id;
        this.setTitle("Recipes View");
    };


    init() {




        const recipeIndex = [
            {
                'recipe': 'Artichoke-Pasta', 'ingredients': ['2 tablespoons butter', '2 cloves garlic, minced', '1 cup heavy cream', '3/4 teaspoon salt', '1 teaspoon fresh-ground black pepper', '2 1/2 cups canned, drained artichoke hearts (two 14-ounce cans), rinsed and cut into halves or quarters', '3/4 pound fusilli', '1/2 cup grated Parmesan cheese', '2 tablespoons chopped chives, scallion tops, or parsley'], 'directions': ['In a medium saucepan, melt the butter over moderately low heat. Add the garlic and cook for 30 seconds. Stir in the cream, salt, pepper, and artichoke hearts. Cook until just heated through, about 3 minutes.', 'In a large pot of boiling, salted water, cook the fusilli until just done, about 13 minutes. Drain the pasta and toss with the cream sauce, Parmesan, and chives.']
            },

            {
                'recipe': 'Lime-Chicken-Tacos', 'ingredients': ['1 1/2 pounds skinless, boneless chicken breast meat - cubed', '1/8 cup red wine vinegar', '1/2 lime, juiced', '1 teaspoon white sugar', '1/2 teaspoon salt', '1/2 teaspoon ground black pepper', '2 green onions, chopped', '2 cloves garlic, minced', '1 teaspoon dried oregano', '10 (6 inch) corn tortillas', '1 tomato, diced', '1/4 cup shredded lettuce', '1/4 cup shredded Monterey Jack cheese', '1/4 cup salsa'], 'directions': ['Saute chicken in a medium saucepan over medium high heat for about 20 minutes. Add vinegar, lime juice, sugar, salt, pepper, green onion, garlic and oregano. Simmer for an extra 10 minutes.', 'Heat an iron skillet over medium heat. Place a tortilla in the pan, warm, and turn over to heat the other side. Repeat with remaining tortillas. Serve lime chicken mixture in warm tortillas topped with tomato, lettuce, cheese and salsa.']
            },

            {
                'recipe': 'Artichoke-Dip', 'ingredients': ['1 8oz package soft cream cheese', '4oz mayonnaise', '4oz sour cream', '1/4 Cup Fresh Grated Parmesan Cheese', '1/4 Cup Fresh Grated Romano Cheese', '2 eggs', '3/4 Cup dairy sour cream', '1 16oz can artichoke hearts', '1/4 Cup fresh chopped chives', '1 tbs fresh minced garlic'], 'directions': ['Soften the cream cheese before mixing.', 'Rinse well, then dice the artichokes into small ½” size pieces.', 'Into a mixing bowl place the softened cream cheese. Mix in the mayonnaise, sour cream, the Parmesan and Romano cheese, artichokes and garlic.', 'When the mixture is fairly well blended, spoon into a 9” round glass pie dish.', 'Set Oven to Bake at 350 degrees.', 'Place un-covered dish into oven for 20 – 25 minutes until the edges appear slightly golden and mixture is bubbling at the edge.', 'Remove and sprinkle chopped chives on top and let cool about 5 minutes before serving.', 'Enjoy!']
            }
        ];

        const recipeDeleteBtn = document.querySelectorAll('.recipe-delete-button');
        const recipeEditBtn = document.querySelectorAll('.recipe-edit-button');
        const recipeAddBtn = document.querySelectorAll('.add-recipe-button');
        const app = document.querySelector('#app');


        //Dialog Box Elements

        let recipeName = document.querySelector(".add-recipe-name");
        let recipeIngredients = document.querySelector(".add-ingredients");
        let recipeDirections = document.querySelector(".add-directions");
        const cornerCloseBtn = document.querySelectorAll('.corner-close');
        const overlay = document.getElementById('overlay');
        const overlayEdit = document.getElementById('overlay-edit');
        const closeBtnDialog = document.querySelectorAll('.add-close');
        const addBtnDialog = document.querySelectorAll('.add-submit');
        const submitBtnDialog = document.querySelectorAll('.edit-submit');
        const dialogBox = document.querySelector('.dialog-box');



        // CONSTANTS

        const EDIT_BUTTON_ICON = '<i class="fas fa-edit"></i>';
        const EDIT_BUTTON_CLASS = 'recipe-edit-button';
        const EDIT_DIALOG_BOX_ID = "#dialog-box-edit";

        const DELETE_BUTTON_ICON = '<i class="fa fa-trash"></i>';
        const DELETE_BUTTON_CLASS = 'recipe-delete-button';


        //Event Listeners



        //Delete Recipe


        recipeDeleteBtn.forEach(button => {
            button.addEventListener('click', removeRecipe)
        });


        function removeRecipe(event) {
            const clickedButton = event.target;
            const containerDiv = clickedButton.parentElement.parentElement.parentElement.parentElement.parentElement;
            containerDiv.removeChild(containerDiv.children[0]);
            const recipeName = clickedButton.parentElement.parentElement.firstChild.innerText;

            deleteRecipefromIndex(recipeName);
            deleteRecipe(recipeName);
            const clonedArray = arr.map(item => ({ ...item }));
        };



        //Add Recipe

        recipeAddBtn.forEach(button => {
            button.addEventListener('click', () => {
                const dialogBox = document.querySelector(button.dataset.modalTarget);
                openDialogBox(dialogBox);

            });
        });

        //Edit Recipe

        recipeEditBtn.forEach(button => {
            button.addEventListener('click', editRecipe)
        });

        function openPopupFromEdit(dialogBox) {
            if (dialogBox !== null) {
                dialogBox.classList.add('active');
                overlayEdit.classList.add('active');
            };
        };

        function openDialogBox(dialogBox) {
            if (dialogBox !== null) {
                dialogBox.classList.add('active');
                resetDialogBox();
            };
        };

        //create Recipe Box each time add button is pressed from inside the pop-up

        addBtnDialog.forEach(button => {
            button.addEventListener('click', createRecipeDiv);
        });

        function createRecipeDiv() {
            const recipeWrap = document.createElement('div');
            recipeWrap.classList.add('recipe-box-wrapper');
            const contentRecipe = document.createElement('div');
            contentRecipe.classList.add('content-recipe');
            const recipeView = document.createElement('div');
            recipeView.classList.add('recipe-view');
            const recipeTitle = document.createElement('div');
            recipeTitle.classList.add('recipe-title');
            let recipeViewName = document.createElement('div');
            recipeViewName.classList.add('recipe-view-name', 'title-row');
            recipeTitle.appendChild(recipeViewName);
            recipeViewName.innerText = recipeName.value;

            const titleRow = document.createElement('div');
            titleRow.classList.add('title-row');


            createButtonElement('button', DELETE_BUTTON_ICON, DELETE_BUTTON_CLASS, titleRow)
            createButtonElement('button', EDIT_BUTTON_ICON, EDIT_BUTTON_CLASS, titleRow);


            recipeTitle.appendChild(titleRow);

            const allEditButtons = Array.from(titleRow.getElementsByClassName('recipe-edit-button'));

            openEditRecipePopup(allEditButtons);

            const allDeleteButtons = titleRow.querySelectorAll('.recipe-delete-button');

            allDeleteButtons.forEach(button => {
                button.addEventListener('click', removeRecipe)
            });

            const recipeBody = document.createElement('div');
            recipeBody.classList.add('recipe-body');


            const headerIngredients = document.createElement('h4');
            headerIngredients.innerHTML = 'Ingredients:';
            recipeBody.appendChild(headerIngredients);


            const ingredientsList = document.createElement('ul');
            ingredientsList.classList.add('ingredients-list');
            recipeBody.appendChild(ingredientsList);

            let listOfIngredients = recipeIngredients.value;


            /*the updateList function populates directions\ingredients section in the recipe body 
            with the information which was filled inside the popup
            */

            updateList(listOfIngredients, ingredientsList)


            const headerDirections = document.createElement('h4');
            headerDirections.innerHTML = 'Directions:';
            recipeBody.appendChild(headerDirections);

            const directionsList = document.createElement('ol');
            directionsList.classList.add('directionsList');
            recipeBody.appendChild(directionsList);


            let listOfDirections = recipeDirections.value;

            /*
            the updateList function populates directions\ingredients section in the recipe body 
            with the information which was filled inside the popup
            */
            updateList(listOfDirections, directionsList);

            recipeView.appendChild(recipeTitle);
            recipeView.appendChild(recipeBody);

            contentRecipe.appendChild(recipeView);
            recipeWrap.appendChild(contentRecipe);

            saveLocalRecipe(recipeName.value, recipeIngredients.value.split("\\"), recipeDirections.value.split("\\"));

            app.appendChild(recipeWrap);


            while (app.childElementCount > 2) {
                app.removeChild(app.children[1]);
            };

            dialogBox.classList.remove('active');

            resetDialogBox();

        };


        //Common functionalties of Add and Edit Recipe

        cornerCloseBtn.forEach(button => {
            button.addEventListener('click', () => {
                const dialogBox = button.closest('.dialog-box')
                closeDialogBox(dialogBox)
            });
        });


        function closeDialogBox(dialogBox) {
            if (dialogBox !== null) {
                dialogBox.classList.remove('active')
                overlay.classList.remove('active')
            };

        };

        closeBtnDialog.forEach(button => {
            button.addEventListener('click', () => {
                const dialogBox = button.closest('.dialog-box')
                closeDialogBox(dialogBox)
            });
        });

        //generic functions

        function createButtonElement(elementType, buttonIcon, classToAdd, divToBeAppendedTo) {
            const button = document.createElement(elementType)
            button.innerHTML = buttonIcon
            button.classList.add(classToAdd)
            divToBeAppendedTo.appendChild(button)
        };

        function resetDialogBox() {
            recipeName.value = "";
            recipeIngredients.value = "";
            recipeDirections.value = "";
        }

        function removeAllChildren(element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild)
            }
        }

        /*the openEditRecipePopup function makes the oppening of the add-recipe pop-up possible
        from the newly created  add - buttons.
         */
        function openEditRecipePopup(buttons) {
            buttons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const clickedButton = event.target;
                    clickedButton.dataset.modalTargetEdit = EDIT_DIALOG_BOX_ID;
                    const dialogBox = document.querySelector(clickedButton.dataset.modalTargetEdit);
                    const recipeViewDiv = clickedButton.parentElement.parentElement.parentElement.parentElement;
                    const recipeTitleDiv = recipeViewDiv.children[0];
                    const recipeTitle = recipeTitleDiv.children[0];
                    const recipeBody = recipeViewDiv.children[1];
                    const ingredientsList = recipeBody.children[1];
                    const directionsList = recipeBody.children[3];


                    const recipeNameInput = document.querySelectorAll('.add-recipe-name');


                    recipeNameInput.forEach(input => {
                        input.value = recipeTitle.innerText;
                    });

                    let ingredientsItems = Array.from(ingredientsList.children);

                    const ingredientText = ingredientsItems.map(item => {
                        return item.innerText
                    }).join("\\");


                    const recipeIngredientInput = document.querySelectorAll('.add-ingredients');
                    recipeIngredientInput.forEach(input => {
                        input.value = ingredientText;
                    });

                    const directionsItems = Array.from(directionsList.children);

                    const directionText = directionsItems.map(item => {
                        return item.innerText
                    }).join("\\");

                    const recipeDirectionsInput = document.querySelectorAll('.add-directions');
                    recipeDirectionsInput.forEach(input => {
                        input.value = directionText;
                    });

                    openDialogBox(dialogBox);


                    const recipeNameText = document.querySelector('.add-recipe-name');
                    recipeNameText.setAttribute('data-old-value', recipeTitle.innerText);

                    const ingredientsText = document.querySelector('.add-ingredients');
                    ingredientsText.setAttribute('data-old-value', ingredientText);

                    const directionsText = document.querySelector('.add-directions');
                    directionsText.setAttribute('data-old-value', directionText);


                    const dialogBoxEdit = document.querySelector('#dialog-box-edit');

                    const allSubmitButtons = Array.from(dialogBoxEdit.getElementsByClassName('edit-submit'));


                    allSubmitButtons.forEach(button => {
                        button.addEventListener('click', (event) => {
                            const clickedButton = event.target;
                            const dialogDiv = clickedButton.parentElement;
                            const recipeName = dialogDiv.children[2];
                            recipeTitle.innerText = recipeName.value;
                            const ingredientInputText = dialogDiv.children[4];
                            let ingredientInput = ingredientInputText.value;

                            removeAllChildren(ingredientsList);


                            updateList(ingredientInput, ingredientsList);

                            const directionInputText = dialogDiv.children[7];
                            let directionsInput = directionInputText.value;

                            removeAllChildren(directionsList);

                            updateList(directionsInput, directionsList);
                            dialogBox.classList.remove('active');

                            var recipeObj = {
                                'recipeName': recipeTitle.innerText, 'ingredients': ingredientInput.split('\\'), 'directions': directionsInput.split('\\')
                            };

                            const oldRecipeName = recipeNameText.getAttribute('data-old-value');
                            const oldIngredients = ingredientsText.getAttribute('data-old-value');
                            const oldDirections = directionsText.getAttribute('data-old-value');

                            const oldIngredientsArray = oldIngredients.split("\\");
                            const oldDirectionsArray = oldDirections.split("\\");


                            if ((!compareArrays(recipeObj.ingredients, oldIngredientsArray)) ||
                                (!compareArrays(recipeObj.directions, oldDirectionsArray)) ||
                                (recipeObj.recipeName !== oldRecipeName)) {
                                deleteRecipefromIndex(oldRecipeName);
                                deleteRecipe(oldRecipeName);
                            };
                            saveLocalRecipe(recipeTitle.innerText, ingredientInput.split('\\'), directionsInput.split('\\'));

                            resetDialogBox();
                        });
                    });
                });
            });
        };

        const compareArrays = (a, b) =>
            a.length === b.length &&
            a.every((v, i) => v === b[i]);


        function deleteRecipefromIndex(recipeName) {
            const indexView = document.querySelector('.index-view');
            const recipeButtons = document.querySelectorAll('[data-link-button]');

            recipeButtons.forEach(btn => {
                if (btn.innerText === recipeName) {
                    indexView.removeChild(btn.parentElement)
                };
            });
        };


        function updateList(item, divToBeAppendedTo) {
            if (item !== null && item !== "") {
                item.split("\\").forEach(ingItem => {
                    let li = document.createElement('li');
                    divToBeAppendedTo.appendChild(li);
                    li.innerText = ingItem;
                });
            };
        };

        function showList(item, divToBeAppendedTo) {
            if (item !== null && item !== "") {
                item.forEach(ingItem => {
                    let li = document.createElement('li');
                    divToBeAppendedTo.appendChild(li);
                    li.innerText = ingItem;
                });
            };
        };


        function editRecipe(event) {
            const clickedButton = event.target;
            clickedButton.dataset.modalTargetEdit = "#dialog-box-edit"
            const dialogBox = document.querySelector(clickedButton.dataset.modalTargetEdit);
            openPopupFromEdit(dialogBox);
            loadContentforEditMode(clickedButton);

            const recipeViewDiv = clickedButton.parentElement.parentElement.parentElement.parentElement;
            const recipeTitleDiv = recipeViewDiv.children[0];
            const recipeTitle = recipeTitleDiv.children[0];
            const recipeBody = recipeViewDiv.children[1];
            const ingredientsList = recipeBody.children[1];
            const directionsList = recipeBody.children[3];



            submitBtnDialog.forEach(button => {
                button.addEventListener('click', (event) => {
                    const clickedButton = event.target;
                    clickedButton.dataset.modalTargetEdit = "#dialog-box-edit"
                    const dialogBox = document.querySelector(clickedButton.dataset.modalTargetEdit);
                    const dialogDiv = clickedButton.parentElement;
                    const recipeName = dialogDiv.children[2];
                    recipeTitle.innerText = recipeName.value;
                    const ingredientInputText = dialogDiv.children[4];
                    let ingredientInput = ingredientInputText.value;

                    removeAllChildren(ingredientsList);


                    updateList(ingredientInput, ingredientsList);



                    const directionInputText = dialogDiv.children[7];
                    let directionsInput = directionInputText.value;

                    removeAllChildren(directionsList);

                    updateList(directionsInput, directionsList);
                    dialogBox.classList.remove('active');

                    resetDialogBox();

                });
            });
        };


        function loadContentforEditMode(clickedButton) {

            const recipeViewDiv = clickedButton.parentElement.parentElement.parentElement.parentElement;
            const recipeTitleDiv = recipeViewDiv.children[0];
            const recipeTitle = recipeTitleDiv.children[0];
            const recipeBody = recipeViewDiv.children[1];
            const ingredientsList = recipeBody.children[1];
            const directionsList = recipeBody.children[3];


            const recipeNameInput = document.querySelectorAll('.add-recipe-name');


            recipeNameInput.forEach(input => {
                input.value = recipeTitle.innerText;
            });

            let ingredientsItems = Array.from(ingredientsList.children);

            const ingredientText = ingredientsItems.map(item => {
                return item.innerText
            }).join("\\");

            const recipeIngredientInput = document.querySelectorAll('.add-ingredients');
            recipeIngredientInput.forEach(input => {
                input.value = ingredientText;
            });

            const directionsItems = Array.from(directionsList.children);

            const directionText = directionsItems.map(item => {
                return item.innerText
            }).join("\\");

            const recipeDirectionsInput = document.querySelectorAll('.add-directions');
            recipeDirectionsInput.forEach(input => {
                input.value = directionText;
            });
        };


        function saveLocalRecipe(recipeName, ingredients, directions) {
            var recipeObj = {
                'recipeName': recipeName, 'ingredients': ingredients, 'directions': directions
            };
            addRecipe(recipeObj);

            populateIndexView(recipeObj);
        };


        function populateIndexView(recipeObj) {

            const recipeName = recipeObj.recipeName;
            const indexView = document.querySelector('.index-view');
            const indexViewItem = document.createElement('div');
            indexViewItem.classList.add('index-view-item');
            const recipeButton = document.createElement('button');
            recipeButton.setAttribute('data-link-button', '');
            recipeButton.innerHTML = recipeName;
            indexViewItem.appendChild(recipeButton);
            indexView.appendChild(indexViewItem);

            const allRecipeButtons = document.querySelectorAll('[data-link-button]');
            allRecipeButtons.forEach(recipeBtn => {

                recipeBtn.addEventListener('click', () => {

                    const clonedArray = arr.map(item => ({ ...item }));

                    const recipeObj = clonedArray.filter(obj => obj.recipeName === recipeBtn.innerText)[0];

                    let {
                        recipeName,
                        ingredients,
                        directions

                    } = recipeObj;

                    while (app.childElementCount > 1) {
                        app.removeChild(app.children[1]);
                    };

                    showRecipe(recipeName, ingredients, directions);

                });
            });

        };



        function showRecipe(recipeName, ingredients, directions) {
            const recipeWrap = document.createElement('div');
            recipeWrap.classList.add('recipe-box-wrapper');
            const contentRecipe = document.createElement('div');
            contentRecipe.classList.add('content-recipe');
            const recipeView = document.createElement('div');
            recipeView.classList.add('recipe-view');
            const recipeTitle = document.createElement('div');
            recipeTitle.classList.add('recipe-title');
            let recipeViewName = document.createElement('div');
            recipeViewName.classList.add('recipe-view-name', 'title-row');
            recipeTitle.appendChild(recipeViewName);
            recipeViewName.innerText = recipeName;

            const titleRow = document.createElement('div');
            titleRow.classList.add('title-row');


            createButtonElement('button', DELETE_BUTTON_ICON, DELETE_BUTTON_CLASS, titleRow)
            createButtonElement('button', EDIT_BUTTON_ICON, EDIT_BUTTON_CLASS, titleRow);


            recipeTitle.appendChild(titleRow);

            const allEditButtons = Array.from(titleRow.getElementsByClassName('recipe-edit-button'));

            openEditRecipePopup(allEditButtons);

            const allDeleteButtons = titleRow.querySelectorAll('.recipe-delete-button');

            allDeleteButtons.forEach(button => {
                button.addEventListener('click', removeRecipe);
            });

            const recipeBody = document.createElement('div');
            recipeBody.classList.add('recipe-body');


            const headerIngredients = document.createElement('h4');
            headerIngredients.innerHTML = 'Ingredients:';
            recipeBody.appendChild(headerIngredients);


            const ingredientsList = document.createElement('ul');
            ingredientsList.classList.add('ingredients-list');
            recipeBody.appendChild(ingredientsList);


            showList(ingredients, ingredientsList)


            const headerDirections = document.createElement('h4');
            headerDirections.innerHTML = 'Directions:';
            recipeBody.appendChild(headerDirections);

            const directionsList = document.createElement('ol');
            directionsList.classList.add('directionsList');
            recipeBody.appendChild(directionsList);


            showList(directions, directionsList);

            recipeView.appendChild(recipeTitle);
            recipeView.appendChild(recipeBody);

            contentRecipe.appendChild(recipeView);
            recipeWrap.appendChild(contentRecipe);

            app.appendChild(recipeWrap);

            dialogBox.classList.remove('active');
            resetDialogBox();
        };

    };

};














