const clockElement = document.getElementById("clock");
const dateElement = document.getElementById("date");
const locationElement = document.getElementById("location");
const timezoneSelect = document.getElementById("timezone-select");
const themeToggle = document.getElementById("toggle-theme");
const colorPicker = document.getElementById("color-picker");

function updateClock() {
  const timezone = timezoneSelect.value;
  const now = new Date();

  // Time
  let timeString;
  if (timezone === "local") {
    timeString = now.toLocaleTimeString();
  } else {
    timeString = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: timezone
    }).format(now);
  }
  clockElement.textContent = timeString;

  // Date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateString = timezone === "local"
    ? now.toLocaleDateString(undefined, options)
    : new Intl.DateTimeFormat('en-US', { ...options, timeZone: timezone }).format(now);
  dateElement.textContent = dateString;

  // Timezone Display
  const displayName = timezone === "local" ? "Your Local Time" : timezone;
  locationElement.textContent = `Timezone: ${displayName}`;
}

setInterval(updateClock, 1000);
updateClock();

// Theme toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
});

// Color Picker: change --clock-color
colorPicker.addEventListener("input", (e) => {
  const newColor = e.target.value;
  document.documentElement.style.setProperty("--clock-color", newColor);
});
