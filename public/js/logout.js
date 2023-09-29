const logout = async () => {
    const response = await fetch('/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/login');
    } else {
      alert('An error occured. Failed to log out');
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);