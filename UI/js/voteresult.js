const officeList = document.getElementById('officeList');
const voteResult = document.getElementById('voteResult');

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
  fetch(`${localStorage.getItem('baseUrl')}office/${officeId}/result`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((body) => {
      let output = '';
      if (body.status === 200) {
        if (body.data.length <= 0) {
          output = '<li>No Result available for this office</li>';
          voteResult.innerHTML = output;
        } else {
          body.data.forEach((result) => {
            output += `<li>${result.firstname} ${result.lastname} (${result.acronym}) - ${result.votes}</li>`;
            voteResult.innerHTML = output;
          });
        }
      }
    })
    .catch(err => err);
});

