
const allParties = () => {
  // const url = 'http://localhost:9000/api/v1/parties/';
  // const baseUrl = localStorage.getItem('baseUrl');


  fetch(`${localStorage.getItem('baseUrl')}parties`, {
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
        body.data.forEach((party, index) => {
          count += 1;
          output += `<tr>
              <td>${count}</td>
              <td>${party.name}</td>
              <td><a href="viewpartyu.html" class="tablelink">${party.hqaddress}</a></td>
              <td>
                  <span><a href="viewpartyu.html?partyid=${party.id}" title="View Party" id="viewparty">view</a></span>
              </td>
          </tr>`;
        });

        const partyContainer = document.getElementById('party-container');
        partyContainer.innerHTML = output;
      }
    }).catch(err => err);
};

allParties();
