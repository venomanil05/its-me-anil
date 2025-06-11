// Wait for DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize variables
  let startDate = localStorage.getItem('startDate');
  if (!startDate) {
    const today = new Date();
    startDate = today.toISOString().split('T')[0];
    localStorage.setItem('startDate', startDate);
  }

  let days = JSON.parse(localStorage.getItem('daysNotes')) || [];
  let currentDayIndex = days.length > 0 ? days.length - 1 : 0;

  const dayNumberEl = document.getElementById('dayNumber');
  const adDateEl = document.getElementById('adDate');
  const startDateDisplay = document.getElementById('startDateDisplay');
  const dayNote = document.getElementById('dayNote');
  const dayList = document.getElementById('dayList');
  const saveNoteBtn = document.getElementById('saveNoteBtn');
  const resetBtn = document.getElementById('resetBtn');
  const addDayBtn = document.getElementById('addDayBtn');

  // Motivation quotes
  const englishQuotes = [
    "Keep going, you're doing great!",
    "Believe in yourself and all that you are.",
    "Every day is a second chance.",
    "Push yourself, because no one else is going to do it for you.",
    "Dream it. Wish it. Do it."
  ];

  const nepaliQuotes = [
    "सफलता धैर्यको फल हो।",
    "आजको परिश्रमले भोलि उज्ज्वल बनाउँछ।",
    "आफूमाथि विश्वास राख्नु सफलता को पहिलो कदम हो।",
    "सपना देख्न डराउनु पर्दैन।",
    "सकारात्मक सोचले जीवन बदलिन्छ।"
  ];

  const quoteText = document.getElementById('quoteText');
  const newQuoteBtn = document.getElementById('newQuoteBtn');

  // Video list
  let videos = JSON.parse(localStorage.getItem('videos')) || [];
  const videoList = document.getElementById('videoList');
  const videoURLInput = document.getElementById('videoURL');
  const addVideoBtn = document.getElementById('addVideoBtn');

  // Update displayed day info
  function updateDayDisplay() {
    dayNumberEl.textContent = currentDayIndex + 1;

    // Calculate English date of the current day
    const start = new Date(startDate);
    const currentDate = new Date(start);
    currentDate.setDate(start.getDate() + currentDayIndex);

    adDateEl.textContent = currentDate.toISOString().split('T')[0];
    startDateDisplay.textContent = `Started on: ${startDate}`;

    // Load note for current day
    dayNote.value = days[currentDayIndex] || '';
    renderDayList();
  }

  // Render all days list
  function renderDayList() {
    dayList.innerHTML = '';
    days.forEach((note, idx) => {
      const li = document.createElement('li');
      li.textContent = `Day ${idx + 1}: ${note.substring(0, 50)}${note.length > 50 ? '...' : ''}`;
      li.style.cursor = 'pointer';
      li.onclick = () => {
        currentDayIndex = idx;
        updateDayDisplay();
      };
      dayList.appendChild(li);
    });
  }

  // Save current day note
  saveNoteBtn.onclick = () => {
    days[currentDayIndex] = dayNote.value.trim();
    localStorage.setItem('daysNotes', JSON.stringify(days));
    alert('Note saved!');
    renderDayList();
  };

  // Reset tracker
  resetBtn.onclick = () => {
    if (confirm('Are you sure you want to reset the tracker? This will delete all saved notes and reset start date.')) {
      days = [];
      currentDayIndex = 0;
      const today = new Date();
      startDate = today.toISOString().split('T')[0];
      localStorage.setItem('daysNotes', JSON.stringify(days));
      localStorage.setItem('startDate', startDate);
      updateDayDisplay();
    }
  };

  // Add new day
  addDayBtn.onclick = () => {
    days.push('');
    currentDayIndex = days.length - 1;
    localStorage.setItem('daysNotes', JSON.stringify(days));
    updateDayDisplay();
  };

  // Motivation quotes
  function getRandomQuote() {
    // Randomly pick English or Nepali quote
    const isEnglish = Math.random() < 0.5;
    if (isEnglish) {
      return englishQuotes[Math.floor(Math.random() * englishQuotes.length)];
    } else {
      return nepaliQuotes[Math.floor(Math.random() * nepaliQuotes.length)];
    }
  }

  newQuoteBtn.onclick = () => {
    quoteText.textContent = getRandomQuote();
  };

  // Initialize with a quote
  quoteText.textContent = getRandomQuote();

  // Video section functions
  function renderVideos() {
    videoList.innerHTML = '';
    videos.forEach((url, idx) => {
      const container = document.createElement('div');
      container.className = 'video-container';

      // Extract video ID from URL
      const videoIdMatch = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/);
      const videoId = videoIdMatch ? videoIdMatch[1] : null;

      if (videoId) {
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        iframe.allowFullscreen = true;
        container.appendChild(iframe);

        // Add remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginTop = '5px';
        removeBtn.onclick = () => {
          videos.splice(idx, 1);
          localStorage.setItem('videos', JSON.stringify(videos));
          renderVideos();
        };
        container.appendChild(removeBtn);

        videoList.appendChild(container);
      }
    });
  }

  addVideoBtn.onclick = () => {
    const url = videoURLInput.value.trim();
    if (url) {
      // Simple YouTube URL validation
      const isValid = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/.test(url);
      if (!isValid) {
        alert('Please enter a valid YouTube URL.');
        return;
      }

      videos.push(url);
      localStorage.setItem('videos', JSON.stringify(videos));
      videoURLInput.value = '';
      renderVideos();
    }
  };

  // Initialize
  updateDayDisplay();
  renderVideos();

  // Initialize AOS
  AOS.init({
    duration: 800,
  });
});
