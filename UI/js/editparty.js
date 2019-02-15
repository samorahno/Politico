const partyName = document.getElementById('partyName');
const partyEditBtn = document.getElementById('partyEditBtn');
const error = document.getElementById('error-msg');
const success = document.getElementById('success-msg');


const partyId = new URL(window.location.href).searchParams.get('partyid');

/**
   * retrieve party name
   */
const getPartyById = () => {
  fetch(`${localStorage.getItem('baseUrl')}/parties/${partyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        partyName.value = body.data[0].name;
      } else {
        error.style.display = 'block';

        if (body.message) {
          error.innerHTML = body.message;
        } else if (body.error) {
          error.innerHTML = body.error;
        } else {
          error.innerHTML = 'An error Occured, Try again';
        }

        setTimeout(() => {
          window.location.href = 'admin_party.html';
        }, 4000);
      }
    })
    .catch(err => err);
};

getPartyById();

/**
 * update party name using id
 */

partyEditBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const adminToken = JSON.parse(localStorage.getItem('token'));
  const partyData = {
    name: partyName.value,
  };

  fetch(`${localStorage.getItem('baseUrl')}parties/${partyId}/name`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'x-access-tok': adminToken,
    },
    body: JSON.stringify(partyData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        success.style.display = 'block';
        success.innerHTML = 'Party Name Edit Successful';
        setTimeout(() => {
          window.location.href = 'admin_party.html#modalcontent';
        }, 3000);
      } else {
        error.style.display = 'block';

        if (body.message) {
          error.innerHTML = body.message;
        } else if (body.error) {
          error.innerHTML = body.error;
        } else {
          error.innerHTML = 'An error Occured, Try again';
        }

        setTimeout(() => {
          window.location.href = 'admin_party.html';
        }, 4000);
      }
    })
    .catch(err => err);
});
