
export let arr = [];


export function addRecipe(recipeObj) {
     arr = [...arr, recipeObj];
};

export function editStoreRecipe(recipeObj) {

     const indexOldElement = arr.findIndex(({ recipeName }) => recipeName == recipeObj.recipeName);

     arr = Object.assign([...arr], { [indexOldElement]: recipeObj });

};

export function deleteRecipe(recipeName) {
     arr = [...arr.filter(item => item.recipeName != recipeName)]
};
