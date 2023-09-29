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

    // Grabs Handlebars
    const templateform = document.getElementById("login-form").innerHTML
    // Compile the Handlebars 
    const template = Handlebars.compile(templateform);
    const templateData = 
    
    {
        user.name: "Enter your username",
        user.password: "Enter your password",
        user.button: "Login"
    };

    const renderedHTML = template(templateData);
    document.querySelector("login-form").innerHTML = renderedHTML;
  
  document.querySelector('.Login-section')
    .addEventListener('submit', loginFormHandler);
  