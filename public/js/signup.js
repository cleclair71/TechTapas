async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#inputUsername').value;
    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  }
  
  document.querySelector('#signup').addEventListener('submit', signupFormHandler);