const info = document.getElementById('info-msg');
const error = document.getElementById('error-msg');
const success = document.getElementById('success-msg');


const getPartyId = () => {
  const partyId = new URL(window.location.href).searchParams.get('partyid');
  return partyId;
};

const viewParty = () => {
  const id = getPartyId();
  fetch(`${localStorage.getItem('baseUrl')}parties/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        const datecreated = new Date(Date.parse(body.data[0].datecreated)).toLocaleString();
        let output = '';
        output = `<tr>
        <td colspan="2"><img src="${body.data[0].logourl}" alt="APC Logo" class="partylogo"></td>
        
      </tr>
      <tr>
        <td>Name</td>
        <td>${body.data[0].name} (${body.data[0].alias})</td>
      </tr>
      <tr>
        <td>Head Quarters</td>
        <td>${body.data[0].hqaddress}</td>
      </tr>
      <tr>
        <td>Created On</td>
        <td>${datecreated}</td>
      </tr>`;


        const partyContainer = document.getElementById('party_container');
        partyContainer.innerHTML = output;
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
    });
};
viewParty();
