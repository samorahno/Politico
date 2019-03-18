const officeList = document.getElementById('officeList');
const candidateList = document.getElementById('candidateList');
const token = JSON.parse(localStorage.getItem('token'));
const voteButton = document.getElementById('voteButton');

const success = document.getElementById('success-msg');
const error = document.getElementById('error-msg');
const warning = document.getElementById('warning-msg');
const info = document.getElementById('info-msg');

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

officeList.addEventListener('change', (e) => {
  e.preventDefault();
  const officeId = officeList.value;
  fetch(`${localStorage.getItem('baseUrl')}candidates/${officeId}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((body) => {
      let output = '';
      if (body.status === 200) {
        if (body.data.length <= 0) {
          output = '<option>No candidate available for this office</option>';
          candidateList.innerHTML = output;
        } else {
          body.data.forEach((candidate) => {
            output += `<option value="${candidate.candidateid}">${candidate.firstname} ${candidate.lastname} - ${candidate.acronym.toUpperCase()}</option>`;
            candidateList.innerHTML = output;
          });
        }
      }
    })
    .catch(err => err);
});


/**
 * vote
 */

voteButton.addEventListener('click', (e) => {
  e.preventDefault();
  const voteData = {
    office: officeList.value,
    candidate: candidateList.value,
  };

  fetch(`${localStorage.getItem('baseUrl')}vote/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(voteData),
  })

    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        error.style.display = 'none';
        success.style.display = 'block';
        success.innerHTML = 'Vote successfully registered';
        setTimeout(() => {
          window.location.reload(true);
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
