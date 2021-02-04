import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  templateUrl = "/static/js/views/recipes.html"
  constructor(params) {
    super(params);
    this.setTitle("Recipes");
  }
  
  init() {

  }
}