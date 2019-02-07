const info = document.getElementById('info-msg');
const error = document.getElementById('error-msg');
const success = document.getElementById('success-msg');

// const url = 'http://localhost:9000/api/v1/parties/';
// const baseUrl = localStorage.getItem('baseUrl');
const getPartyId = () => {
  const partyId = new URL(window.location.href).searchParams.get('id');
};

const viewParty = () => {
  const id = getPartyId();
  fetch(`${localStorage.getItem('baseUrl')}parties/id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 200) {
        console.log(body.data);
        // const formatedDate = moment(body.data[0].da).format('dddd, MMMM Do YYYY, h:mm:ss a');
        let output = '';
        output = `<div class="widget widget_table" style="overflow-x:auto;">
        <div class="title heado">Political Party</div>
        <div class="widget_stat widget_stat_table">
        <div style="overflow-x:auto;">
          <table style="overflow:scroll;">
            <tr>
              <td colspan="2"><img src="../images/apclogo.jpg" alt="APC Logo" class="partylogo"></td>
              
            </tr>
            <tr>
              <td>Name</td>
              <td>All Progressive Congress (APC)</td>
            </tr>
            <tr>
              <td>Head Quarters</td>
              <td>40 Blantyre Street, Wuse II, Abuja</td>
            </tr>
            <tr>
              <td>Created On</td>
              <td>20 - 01 - 2019</td>
            </tr>
            
          </table>
          </div>
          
        </div>`;


        const partyContainer = document.getElementById('party_container');
        partyContainer.innerHTML = output;
      } else {
        console.log(body);
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
