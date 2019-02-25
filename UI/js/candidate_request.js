const success = document.getElementById('success-msg');
const error = document.getElementById('error-msg');
const warning = document.getElementById('warning-msg');
const info = document.getElementById('info-msg');

const token = JSON.parse(localStorage.getItem('token'));
const candidateRequestList = () => {
  fetch(`${localStorage.getItem('baseUrl')}interest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  })
    .then(res => res.json())
    .then((body) => {
      const interestContainer = document.getElementById('interestContainer');
      if (body.status === 200) {
        let output = '';
        let count = 0;
        if (body.data.length <= 0) {
          output = '<tr><td colspan="5"><strong>No interest available<strong></td></tr>';
          interestContainer.innerHTML = output;
        } else {
          body.data.forEach((interest) => {
            const datecreated = new Date(Date.parse(interest.created_date)).toLocaleString();
            count += 1;
            const officeid = JSON.stringify(interest.officeid);
            const partyid = JSON.stringify(interest.partyid);
            const userid = JSON.stringify(interest.userid);
            output += `<tr>
                <td>${count}</td>
                <td>${interest.firstname} ${interest.lastname}</td>
                <td>${interest.officename}</td>
                <td>${datecreated}</td>
                <td>
                    
                    <a href="#" onclick = RegisterCandidate(${officeid},${partyid},${userid}); class="btn2">Register</a>
                </td>
            </tr>`;
          });

          interestContainer.innerHTML = output;
        }
      }
    }).catch(err => err);
};
candidateRequestList();

const RegisterCandidate = (candidateOfficeId, candidatePartyId, candidateUserId) => {
  const candidateData = {
    partyid: candidatePartyId,
    officeid: candidateOfficeId,
    userid: candidateUserId,
  };

  fetch(`${localStorage.getItem('baseUrl')}office/${candidateData.userid}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(candidateData),
  })
    .then(res => res.json())
    .then((body) => {
      if (body.status === 201) {
        error.style.display = 'none';
        success.style.display = 'block';
        success.innerHTML = 'Candidate successfully created';
        setTimeout(() => {
          window.location.reload(true);
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
    })
    .catch(err => err);
};
