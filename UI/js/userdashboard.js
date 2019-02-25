const viewCandidates = () => {
  fetch(`${localStorage.getItem('baseUrl')}candidates`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then((body) => {
      const candidate_count = body.data.length;
      if (body.status === 200) {
        let output = '';
        let count = 0;

        if (candidate_count <= 0) {
          output += `<article class="card">
                <img src="../images/Anonymous.JPG" alt="User Image">
              <div class="text">
                <h2><strong>No candidate available at this time</strong> </h2>    
              </div>
            </article>`;
        } else {
          body.data.forEach((candidate, index) => {
            count += 1;
            output += `<article class="card">
                    <img src="${candidate.passporturl}" alt="${candidate.firstname} photo">
                    <div class="text">
                      <h4><strong>Name:</strong> ${candidate.firstname} ${candidate.lastname} </h4>
                      <p><strong>Office:</strong> ${candidate.officename} </p>
                      <p><strong>Party:</strong> ${candidate.alias} </p>
                     
                    </div>
                  </article>`;
          });
        }


        const partyContainer = document.getElementById('candidate-container');
        partyContainer.innerHTML = output;
      }
    }).catch(err => err);
};

viewCandidates();
