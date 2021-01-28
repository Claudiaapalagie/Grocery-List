import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Recipes");
    }

    async getHtml() {
        return `
        <h1>Recipes</h1>
        <ul>
          <li>
            <a href="/recipes/pasta" data-link> Pasta</a>
          </li>
          <li>
            <a href="/recipes/chicken" data-link> Chicken</a>
          </li>
        </ul>
      `;
    }
}