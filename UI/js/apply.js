const officeApplyButton = document.getElementById('officeApplyButton');
const partyList = document.getElementById('partyList');
const officeList = document.getElementById('officeList');
const id = localStorage.getItem('id');

const success = document.getElementById('success-msg');
const error = document.getElementById('error-msg');
const warning = document.getElementById('warning-msg');
const info = document.getElementById('info-msg');

const allParties = () => {
  fetch(`${localStorage.getItem('baseUrl')}parties`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        const partyList = document.getElementById('partyList');
        if ((body.data).length <= 0) {
          const output = '<option value="">No party available at this time</option>';
          partyList.innerHTML = output;
        } else {
          let output = '<option value="">Select a Party</option>';
          body.data.forEach((party, index) => {
            output += `
              <option value="${party.id}">${party.name} (${party.alias ? party.alias : '[N/A]'})</option>
              `;
          });
          partyList.innerHTML = output;
        }
      }
    }).catch(err => err);
};
allParties();


const allOffices = () => {
  fetch(`${localStorage.getItem('baseUrl')}offices/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        const officeList = document.getElementById('officeList');
        if ((body.data).length <= 0) {
          const output = '<option value="">No office available at this time</option>';
          officeList.innerHTML = output;
        } else {
          let output = '<option value="">Select an office</option>';
          body.data.forEach((office, index) => {
            output += `
                  <option value="${office.id}">${office.name}</option>
                  `;
          });
          officeList.innerHTML = output;
        }
      }
    }).catch(err => err);
};

allOffices();

officeApplyButton.addEventListener('click', (e) => {
  e.preventDefault();
  const candidateData = {
    officeid: officeList.value,
    partyid: partyList.value,
    userid: id,
  };

  const Token = JSON.parse(localStorage.getItem('token'));

  fetch(`${localStorage.getItem('baseUrl')}interest/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': Token,
    },
    body: JSON.stringify(candidateData),
  })

    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        error.style.display = 'none';
        success.style.display = 'block';
        success.innerHTML = 'Interest successfully registered';
        setTimeout(() => {
          window.location.reload(true);
          document.location.href = '#modalcontent';
        }, 5000);
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
