import Recipes from "./views/Recipes.js";
import RecipesView from "./views/RecipesView.js";
import MainPageView from "./views/MainPageView.js";

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [
        { path: "/", view: MainPageView },
        // { path: "/recipes", view: Recipes },
        { path: "/recipes", view: RecipesView }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);


    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    function keepLastChild(container) {
        while (container.children.length > 0) {
            container.removeChild(container.firstChild);
        };
    };

    const app = document.querySelector("#app");

    const view = new match.route.view(getParams(match));
    const htmlTemplateUrl = view.templateUrl;
    const htmlTemplate = await fetch(htmlTemplateUrl);
    const template = await htmlTemplate.text();
    const childElement = document.createElement('template');
    childElement.innerHTML = template;

    keepLastChild(app);

    const actualItems = childElement.content.firstChild;
    app.appendChild(actualItems);

    view.init();

};


window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if (e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    });

    router();
});

