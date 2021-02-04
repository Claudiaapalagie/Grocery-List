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
        { path: "/recipes", view: Recipes },
        { path: "/recipes/:id", view: RecipesView }
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

    const view = new match.route.view(getParams(match));
    const htmlTemplateUrl = view.templateUrl;
    // console.log(view.path)
    const htmlTemplate = await fetch(htmlTemplateUrl);
    const template = await htmlTemplate.text();
    const childElement = document.createElement('template');
    childElement.innerHTML = template;
    if(view.templateUrl !== "/static/js/views/recipesView.html") {
        const actualItems = childElement.content.firstChild;
        document.querySelector("#app").removeChild(document.querySelector("#app").firstChild)
        document.querySelector("#app").appendChild(actualItems);
    } else {
        const actualItems1 = childElement.content.children[0];
        const actualItems2 = childElement.content.children[2];
        const actualItems4 = childElement.content.children[3];

        const actualItems3 = childElement.content.lastChild;

        document.querySelector("#app").removeChild(document.querySelector("#app").firstChild)
        document.querySelector("#app").appendChild(actualItems1);
        document.querySelector("#app").appendChild(actualItems2);
        document.querySelector("#app").appendChild(actualItems3);
        document.querySelector("#app").appendChild(actualItems4);
    }
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

