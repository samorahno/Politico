const signupBtn = document.getElementById('signupbtn');
const success = document.getElementById('success-msg');
const error = document.getElementById('error-msg');
const warning = document.getElementById('warning-msg');
const info = document.getElementById('info-msg');


localStorage.setItem('baseUrl', 'https://samson-politico.herokuapp.com/api/v1/');

signupBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const firstName = document.getElementById('firstname');
  const lastName = document.getElementById('lastname');
  const signupEmail = document.getElementById('signupemail');
  const phoneNumber = document.getElementById('phonenumber');
  const signupPassword = document.getElementById('signuppassword');
  const confirmSignupPassword = document.getElementById('confirmsignuppassword');

  const userInput = {
    firstname: firstName.value,
    lastname: lastName.value,
    email: signupEmail.value,
    password: signupPassword.value,
    confirmPassword: confirmSignupPassword.value,
    phone: phoneNumber.value,
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
        
        setTimeout(() => {
          window.location.href = 'views/userdashboard.html';    
        }, 2000);
        document.location.href = '#modalcontent';
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
