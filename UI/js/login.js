const loginBtn = document.getElementById('loginbtn');
const successLogin = document.getElementById('success-msg-login');
const errorLogin = document.getElementById('error-msg-login');
const loggedProfile = document.getElementById('loggedProfile');

const url_login = 'http://localhost:9000/api/v1/';
const baseUrlLogin = 'https://samson-politico.herokuapp.com/api/v1/';

localStorage.setItem('baseUrl', url_login);

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const loginemail = document.getElementById('loginemail');
  const loginpassword = document.getElementById('loginpassword');

  const userInput = {
    email: loginemail.value,
    password: loginpassword.value,
  };

  // eslint-disable-next-line no-console

  fetch(`${localStorage.getItem('baseUrl')}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        const userData = {
          username: body.data[0].user.firstname,
          token: body.data[0].token,
          isAdmin: body.data[0].user.isAdmin,
          id: body.data[0].user.id,
        };
        localStorage.setItem('token', JSON.stringify(userData.token));
        localStorage.setItem('name', userData.username);
        localStorage.setItem('id', userData.id);
        errorLogin.style.display = 'none';
        successLogin.style.display = 'block';
        successLogin.innerHTML = 'Login Successful';
        const loggedUserName = localStorage.getItem('name');
        if (userData.isAdmin) {
          setTimeout(() => {
            window.location.href = 'views/dashboard.html';
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.href = 'views/userdashboard.html';
          }, 2000);
        }
      } else {
        errorLogin.style.display = 'block';
        successLogin.style.display = 'none';
        if (body.message) {
          errorLogin.innerHTML = body.message;
        } else if (body.error) {
          errorLogin.innerHTML = body.error;
        } else {
          errorLogin.innerHTML = 'An error Occured, Try again';
        }
      }
    }).catch(err => err);
});
