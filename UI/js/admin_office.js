const officeBtn = document.getElementById('officeBtn');
const officeName = document.getElementById('officeName');
const officeType = document.getElementById('officeType');

const success = document.getElementById('success-msg');
const error = document.getElementById('error-msg');
const warning = document.getElementById('warning-msg');
const info = document.getElementById('info-msg');

officeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const officeData = {
    name: officeName.value,
    type: officeType.value,
  };


  const adminToken = JSON.parse(localStorage.getItem('token'));

  fetch(`${localStorage.getItem('baseUrl')}offices/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': adminToken,
    },
    body: JSON.stringify(officeData),
  })

    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        error.style.display = 'none';
        success.style.display = 'block';
        success.innerHTML = 'Office successfully created';
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
        let output = '';
        let count = 0;
        const datecreated = new Date(Date.parse(body.data[0].created_date)).toLocaleString();
        body.data.forEach((office) => {
          count += 1;
          output += `<tr>
          <td>${count}</td>
          <td>${office.name}</td>
          <td>${office.type}</td>
          <td>${datecreated}</td>
          <!--<td>
              <span><a href="editoffice.html" title="Edit Office">view</i></a></span> | 
              <span><a href="#" title="Delete Office" onclick = "return confirm ('Are you sure you want to delete this office?');">delete</i></a></span>
          </td>-->
      </tr>`;
        });

        const officeContainer = document.getElementById('officeContainer');
        officeContainer.innerHTML = output;
      }
    }).catch(err => err);
};

allOffices();
