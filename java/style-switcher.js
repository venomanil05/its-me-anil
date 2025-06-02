// Toggle style switcher panel open/close
const styleSwitcher = document.querySelector('.style-switcher');
const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');

styleSwitcherToggler.addEventListener('click', () => {
  styleSwitcher.classList.toggle('open');
});

// Function to switch theme colors
function setActiveStyle(colorName) {
  // Remove active class from all colors
  document.querySelectorAll('.colors span').forEach(el => {
    el.classList.remove('active');
  });
  // Add active class to clicked color
  document.querySelector(`.colors .${colorName}`).classList.add('active');

  // Remove previously applied color classes from body
  document.body.classList.remove('color-1', 'color-2', 'color-3', 'color-4', 'color-5');

  // Add new color class to body for CSS styling
  document.body.classList.add(colorName);

  // Optionally store user choice in localStorage
  localStorage.setItem('color-theme', colorName);
}

// Load stored theme on page load
window.addEventListener('load', () => {
  const storedColor = localStorage.getItem('color-theme');
  if (storedColor) {
    setActiveStyle(storedColor);
  }
});

// Day/Night mode toggle
const dayNight = document.querySelector('.day-night');
const sunIcon = dayNight.querySelector('.fa-sun');
const moonIcon = dayNight.querySelector('.fa-moon');

dayNight.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
    localStorage.setItem('theme-mode', 'dark');
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
    localStorage.setItem('theme-mode', 'light');
  }
});

// Initialize sun/moon icon on load depending on theme
window.addEventListener('load', () => {
  if (localStorage.getItem('theme-mode') === 'dark') {
    document.body.classList.add('dark');
    sunIcon.style.display = 'inline';
    moonIcon.style.display = 'none';
  } else {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'inline';
  }
});

function setActiveStyle(colorName) {
  const styles = document.querySelectorAll(".alternate-style");
  styles.forEach(style => {
    if (style.getAttribute("title") === colorName) {
      style.removeAttribute("disabled");
    } else {
      style.setAttribute("disabled", "true");
    }
  });
}
