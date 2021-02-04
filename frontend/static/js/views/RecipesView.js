import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    templateUrl = "/static/js/views/recipesView.html"
    constructor(params) {
        super(params);
        this.recipeId = params.id;
        this.setTitle("Recipes View");
    };


    init() {

        const recipeDeleteBtn = document.querySelectorAll('.recipe-delete-button')
        const recipeEditBtn = document.querySelectorAll('.recipe-edit-button')
        const recipeAddBtn = document.querySelectorAll('.add-recipe-button')


        //Dialog Box Elements

        let recipeName = document.querySelector(".add-recipe-name");
        let recipeIngredients = document.querySelector(".add-ingredients");
        let recipeDirections = document.querySelector(".add-directions");
        const cornerCloseBtn = document.querySelectorAll('.corner-close')
        const overlay = document.getElementById('overlay')
        const overlayEdit = document.getElementById('overlay-edit')
        const closeBtnDialog = document.querySelectorAll('.add-close')
        const addBtnDialog = document.querySelectorAll('.add-submit')
        const submitBtnDialog = document.querySelectorAll('.edit-submit')
        const dialogBox = document.querySelector('.dialog-box')


        // CONSTANTS

        const ADD_BUTTON_ICON = '<i class="fa fa-plus-square"></i>';
        const ADD_BUTTON_CLASS = 'add-recipe-button';
        const ADD_DIALOG_BOX_ID = '#dialog-box';


        const EDIT_BUTTON_ICON = '<i class="fas fa-edit"></i>';
        const EDIT_BUTTON_CLASS = 'recipe-edit-button';
        const EDIT_DIALOG_BOX_ID = "#dialog-box-edit";

        const DELETE_BUTTON_ICON = '<i class="fa fa-trash"></i>';
        const DELETE_BUTTON_CLASS = 'recipe-delete-button';




        //Delete Recipe


        recipeDeleteBtn.forEach(button => {
            button.addEventListener('click', removeRecipe)
        });


        function removeRecipe(event) {
            const clickedButton = event.target;
            const containerDiv = clickedButton.parentElement.parentElement.parentElement.parentElement.parentElement;
            containerDiv.removeChild(containerDiv.children[0]);
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
            }
        }



        function openDialogBox(dialogBox) {
            if (dialogBox !== null) {
                dialogBox.classList.add('active')
                overlay.classList.add('active')
                resetDialogBox();
            }
        }

        //create Recipe Box each time add button is pressed from inside the pop-up

        addBtnDialog.forEach(button => {
            button.addEventListener('click', createRecipeDiv)
        })

        function createRecipeDiv(event) {
            const clickedButton = event.target;
            console.log(clickedButton)
            const appDiv = document.querySelector('#app');
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

            console.log("Lista de Ingrediente")
            console.log(listOfIngredients);

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

            // const addButtonDiv = document.createElement('div');
            // addButtonDiv.classList.add('recipe-add-button-div');

            // createButtonElement('button', ADD_BUTTON_ICON, ADD_BUTTON_CLASS, addButtonDiv);


            contentRecipe.appendChild(recipeView);
            recipeWrap.appendChild(contentRecipe);
            // recipeWrap.appendChild(addButtonDiv);
            appDiv.appendChild(recipeWrap);


            // const allAddButtons = recipeWrap.querySelectorAll('.add-recipe-button');
            // openAddRecipePopup(allAddButtons);

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

        //helper functions

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

        /*the openAddRecipePopup function makes the oppening of the add-recipe pop-up possible
        from the newly created  add - buttons.
         */
        function openAddRecipePopup(buttons) {
            buttons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const clickedButton = event.target;
                    clickedButton.dataset.modalTarget = ADD_DIALOG_BOX_ID;
                    const dialogBox = document.querySelector(clickedButton.dataset.modalTarget);
                    openDialogBox(dialogBox);
                });
            });
        };

        /*the openEditRecipePopup function makes the oppening of the add-recipe pop-up possible
        from the newly created  add - buttons.
         */
        function openEditRecipePopup(buttons) {
            buttons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const clickedButton = event.target;
                    clickedButton.dataset.modalTargetEdit = EDIT_DIALOG_BOX_ID;
                    const dialogBox = document.querySelector(clickedButton.dataset.modalTargetEdit);
                    loadContentforEditMode(clickedButton)
                    openDialogBox(dialogBox);

                    const recipeViewDiv = clickedButton.parentElement.parentElement.parentElement.parentElement;
                    const recipeTitleDiv = recipeViewDiv.children[0];
                    const recipeTitle = recipeTitleDiv.children[0];
                    const recipeBody = recipeViewDiv.children[1];
                    const ingredientsList = recipeBody.children[1];
                    const directionsList = recipeBody.children[3];


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

                            console.log(ingredientsList)
                            updateList(ingredientInput, ingredientsList);

                            const directionInputText = dialogDiv.children[7];
                            let directionsInput = directionInputText.value;

                            removeAllChildren(directionsList);

                            updateList(directionsInput, directionsList);
                            dialogBox.classList.remove('active');
                            resetDialogBox();

                        })
                    });

                })
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

                    console.log(ingredientsList)

                    const directionInputText = dialogDiv.children[7];
                    let directionsInput = directionInputText.value;

                    removeAllChildren(directionsList);

                    updateList(directionsInput, directionsList);
                    dialogBox.classList.remove('active');
                    resetDialogBox()
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






















    };
};