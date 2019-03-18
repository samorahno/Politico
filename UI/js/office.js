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
        // const datecreated = new Date(Date.parse(body.data[0].created_date)).toLocaleString();
        body.data.forEach((office) => {
          count += 1;
          output += `<tr>
            <td>${count}</td>
            <td>${office.name}</td>
            <td>${office.type}</td>
        </tr>`;
        });

        const officeContainer = document.getElementById('officeContainer');
        officeContainer.innerHTML = output;
      }
    }).catch(err => err);
};

allOffices();
