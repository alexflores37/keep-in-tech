// Imports Handlebars
const Handlebars = require('handlebars');

// Function to handle the login form 
const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to log in');
        }
    }
};

// Grabs Handlebars template
const templateform = document.getElementById("login-form").innerHTML;
const template = Handlebars.compile(templateform);

const templateData = {
    user: {
        name: "Enter your username",
        password: "Enter your password",
        button: "submit"
    }
};

const renderedHTML = template(templateData);

document.getElementById("login-form").innerHTML = renderedHTML;
document.querySelector('.Login-section form').addEventListener('submit', loginFormHandler);

  