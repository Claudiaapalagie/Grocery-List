import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Recipes");
    }

    async getHtml() {
        return `
         <h1 class="recipes-list-title">Recipes List</h1>
        <div class="index-view">
          <div class="index-view-item">
          <a href="/recipes/pasta" data-link>Pasta</a>
          </div>
          <div class="index-view-item">
          <a href="/recipes/chicken" data-link>Chicken</a>
          </div>
      `;
    }
}