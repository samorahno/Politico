const createPartyBtn = document.getElementById('createPartyBtn');
const partyName = document.getElementById('partyName');
const partyAbbreviation = document.getElementById('partyAbbreviation');
const hqAddress = document.getElementById('hqAddress');
const partyLogo = document.getElementById('partyLogo');

const success = document.getElementById('success-msg');
const error = document.getElementById('error-msg');
const warning = document.getElementById('warning-msg');
const info = document.getElementById('info-msg');

createPartyBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const partyData = {
    name: partyName.value,
    alias: partyAbbreviation.value,
    hqAddress: hqAddress.value,
    logoUrl: partyLogo.value,
  };

  const adminToken = JSON.parse(localStorage.getItem('token'));

  fetch(`${localStorage.getItem('baseUrl')}parties/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': adminToken,
    },
    body: JSON.stringify(partyData),
  })

    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        error.style.display = 'none';
        success.style.display = 'block';
        success.innerHTML = 'Party successfully created';
        setTimeout(() => {
          window.location.reload(true);
          document.location.href = '#modalcontent';
        }, 1000);
      } else {
        error.style.display = 'block';
        if (body.message) {
          error.innerHTML = body.message;
        } else if (body.error) {
          error.innerHTML = body.error;
        } else {
          error.innerHTML = 'An error Occured, Try again';
        }
      }
    }).catch(err => err);
});

const allParties = () => {
  fetch(`${localStorage.getItem('baseUrl')}parties/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        let output = '';
        let count = 0;
        body.data.forEach((party) => {
          count += 1;
          output += `<tr>
              <td>${count}</td>
              <td>${party.name}</td>
              <td><a href="viewpartyu.html" class="tablelink">${party.hqaddress}</a></td>
              <td>
                            <span><a href="viewparty.html?partyid=${party.id}" title="View Party" id="viewparty">view</i></a></span> | 
                            <span><a href="editparty.html?partyid=${party.id}" title="Edit Party">edit</i></a></span> | 
                            <span><a href="#" title="Delete Party"  onclick = deleteParty(${JSON.stringify(party.id)});>Delete</a></span>
                            
          </tr>`;
        });

        const partyContainer = document.getElementById('partyData');
        partyContainer.innerHTML = output;
      }
    }).catch(err => err);
};

allParties();

const deleteParty = (mmid) => {
  // eslint-disable-next-line no-alert
  // eslint-disable-next-line no-restricted-globals
  const confirmDelete = confirm('Are you sure you want to delete this party?');
  const adminToken = JSON.parse(localStorage.getItem('token'));
  if (confirmDelete) {
    fetch(`${localStorage.getItem('baseUrl')}parties/${mmid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': adminToken,
      },
    })
      .then(res => res.json())
      .then((body) => {
        if (body.status === 200) {
          error.style.display = 'none';
          success.style.display = 'block';
          success.innerHTML = 'Party successfully Deleted';
          setTimeout(() => {
            window.location.reload(true);
          }, 2000);
        } else {
          error.style.display = 'block';
          if (body.message) {
            error.innerHTML = body.message;
          } else if (body.error) {
            error.innerHTML = body.error;
          } else {
            error.innerHTML = 'An error Occured, Try again';
          }
        }
      })
      .catch(err => err);
  } else {
    window.location.reload(true);
  }
};
