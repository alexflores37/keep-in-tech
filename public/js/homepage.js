// Import Handlebars 
const Handlebars = require('handlebars');

// Select the element where you want to insert the rendered HTML
const categoriesElement = document.querySelector("#categories")
const sportsform = "<p>{{name}} - {{team}}</p>";

const template = Handlebars.compile(sportsform);

// Define your data object
const sportsData = {
    name: "Name of the sport",
    team: "Name of team",
};

const renderedHTML = template(sportsData);
categoriesElement.innerHTML = renderedHTML;


