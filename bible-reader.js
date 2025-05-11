// Bible Reader Logic - bible-reader.js

// Toggle Night Mode
export function toggleNightMode() {
  document.body.classList.toggle('night-mode');
}

// Load Bible Verses
export async function loadBible() {
  try {
    const book = document.getElementById('bookSelect').value;
    const chapter = document.getElementById('chapterInput').value;
    const start = document.getElementById('start-verse').value || 1;
    const end = document.getElementById('end-verse').value || 'full';

    const url = `https://raw.githubusercontent.com/Healtime2025/GraceVoice-online/main/bibles/English/KJV/${book}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load Bible file.");

    const data = await response.json();
    const chapterData = data[book];

    if (!chapterData) {
      document.getElementById('verseDisplay').innerText = "❌ No verses found for your selection.";
      return;
    }

    let text = "";

    // Check for both formats
    if (typeof chapterData[chapter] === 'object') {
      // Nested format
      const selectedChapter = chapterData[chapter];
      for (let i = start; i <= (end === 'full' ? Object.keys(selectedChapter).length : end); i++) {
        if (selectedChapter[i]) {
          text += `<div class='verse-line' id='verse-${chapter}:${i}'>${i}: ${selectedChapter[i]}</div>\n`;
        }
      }
    } else {
      // Flat chapter-verse format
      for (const key in chapterData) {
        if (key.startsWith(chapter + ":")) {
          text += `<div class='verse-line' id='verse-${key}'>${key}: ${chapterData[key]}</div>\n`;
        }
      }
    }

    document.getElementById('verseDisplay').innerHTML = text.trim() || "❌ No verses available for your selection.";

  } catch (error) {
    console.error("Error loading Bible: ", error);
    document.getElementById('verseDisplay').innerText = "❌ Error loading Bible text. Check console for details.";
  }
}

// Start Reading with Resume
let currentIndex = 0;
export function startReading() {
  const verses = document.querySelectorAll('.verse-line');

  function readAndProgress() {
    if (currentIndex >= verses.length) return;

    const speech = new SpeechSynthesisUtterance(verses[currentIndex].innerText.replace(/^[0-9]+:\s*/, ''));
    speech.onend = () => {
      currentIndex++;
      readAndProgress();
    };

    speechSynthesis.speak(speech);
  }

  speechSynthesis.cancel();
  readAndProgress();
}

// Read with Highlight
export function startReadingWithHighlight() {
  const verses = document.querySelectorAll('.verse-line');

  function highlightAndRead() {
    if (currentIndex >= verses.length) return;

    verses.forEach((v, i) => v.style.backgroundColor = (i === currentIndex) ? 'yellow' : 'transparent');
    const speech = new SpeechSynthesisUtterance(verses[currentIndex].innerText.replace(/^[0-9]+:\s*/, ''));
    speech.onend = () => {
      currentIndex++;
      highlightAndRead();
    };

    speechSynthesis.speak(speech);
  }

  speechSynthesis.cancel();
  highlightAndRead();
}

// Stop Reading
export function stopReading() {
  speechSynthesis.cancel();
  document.querySelectorAll('.verse-line').forEach(v => v.style.backgroundColor = 'transparent');
}

// Start Voice Command
export function startVoiceCommand() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    document.getElementById("voiceFeedback").innerText = `You said: "${command}"`;
  };
  recognition.start();
}
