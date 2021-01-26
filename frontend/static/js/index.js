import RecipesView from "./views/RecipesView.js"

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    const routes = [
        { path: "/", view: () => console.log("Viewing Main Page") },
        { path: "/recipes", view: RecipesView }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch)

    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        };
    }

    // console.log(match.route.view())

    const view = new match.route.view();

    document.querySelector("#recipes-view").innerHTML = await view.getHTML();

    console.log(match.route.view());
}

window.addEventListener("popstate", router)

document.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("click", e => {
        if(e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href)
        }
    })
    router();
});

