const overlay = document.getElementById('loader-overlay');
if (overlay) {
  window.addEventListener('load', () => {
    overlay.style.display = 'none';
  });
}

const modal = document.getElementById('myModal');

const btn = document.getElementById('myBtn');

const span = document.getElementsByClassName('close')[0];

const modal2 = document.getElementById('myModal2');

const btn2 = document.getElementById('myBtn2');

const span2 = document.getElementsByClassName('close')[1];

const modal3 = document.getElementById('myModal3');

const btn3 = document.getElementById('myBtn3');

const span3 = document.getElementsByClassName('close')[2];

btn.addEventListener('click', (e) => {
  modal.style.display = 'block';
});

span.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
  if (event.target === modal2) {
    modal2.style.display = 'none';
  }
  if (event.target === modal3) {
    modal3.style.display = 'none';
  }
});

btn2.addEventListener('click', () => {
  modal2.style.display = 'block';
});

span2.addEventListener('click', () => {
  modal2.style.display = 'none';
});


btn3.addEventListener('click', () => {
  modal.style.display = 'none';
  modal3.style.display = 'block';
});

span3.addEventListener('click', () => {
  modal3.style.display = 'none';
});
