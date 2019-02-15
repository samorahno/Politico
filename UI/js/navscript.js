const overlay = document.getElementById('loader-overlay');
if (overlay) {
  window.addEventListener('load', () => {
    overlay.style.display = 'none';
  });
}
let displayStyle;
// function to trigger the toggle
function togle_nav_func() {
  const elem = document.getElementById('togle_nav');
  if (elem.currentStyle) {
    displayStyle = elem.currentStyle.display;
  } else if (window.getComputedStyle) {
    displayStyle = window.getComputedStyle(elem, null).getPropertyValue('display');
  }
  if (displayStyle === 'block') {
    elem.style.display = 'none';
  } else {
    elem.style.display = 'block';
  }
}

const name = localStorage.getItem('name');
const loggedProfile = document.getElementById('loggedProfile');
loggedProfile.innerHTML = `Welcome ${name}`;
