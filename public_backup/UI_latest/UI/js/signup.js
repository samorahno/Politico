const signupbtn = document.getElementById('signupbtn');
const success = document.getElementById('success-msg');
const error = document.getElementById('error-msg');
const warning = document.getElementById('warning-msg');
const info = document.getElementById('info-msg');


localStorage.setItem('baseUrl', 'http://localhost:9000/api/v1/');

signupbtn.addEventListener('click', (e) => {
  e.preventDefault();
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const signupemail = document.getElementById('signupemail');
  const phonenumber = document.getElementById('phonenumber');
  const signuppassword = document.getElementById('signuppassword');
  const confirmsignuppassword = document.getElementById('confirmsignuppassword');

  const userInput = {
    firstname: firstname.value,
    lastname: lastname.value,
    email: signupemail.value,
    password: signuppassword.value,
    confirmPassword: confirmsignuppassword.value,
    phone: phonenumber.value,
  };

  // eslint-disable-next-line no-console

  fetch(`${localStorage.getItem('baseUrl')}auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        const userData = {
          username: body.data[0].user.firstname,
          token: body.data[0].token,
        };
        localStorage.setItem('token', JSON.stringify(userData.token));
        localStorage.setItem('name', JSON.stringify(userData.username));
        error.style.display = 'none';
        success.style.display = 'block';
        success.innerHTML = 'Signup Successful';
        document.location.href = '#modalcontent';
        setTimeout(() => {
          window.location.href = 'views/userdashboard.html';
        }, 20000);
      } else {
        error.style.display = 'block';
        if (body.message) {
          error.innerHTML = body.message;
        } else if (body.error) {
          error.innerHTML = body.error;
        } else {
          error.innerHTML = 'An error Occured, Try again';
        }
        document.location.href = '#modalcontent';
      }
    }).catch(err => err);
});
