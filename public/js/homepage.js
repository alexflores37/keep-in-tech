const homepage = require('')
const exphbs = require('express-handlebars');


// Grabs Handlebars
const sports = document.querySelector("categories").innerHTML
// Compile the Handlebars 
const template = Handlebars.compile(sportsform);
const sportsData = {
    sports.name: "Name of the sport",
    sports.team: "Name of team",
};

const renderedHTML = template(sportsData);
document.querySelector("categories").innerHTML = renderedHTML;

