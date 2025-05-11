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
    const chapterData = data[book]?.[''] || {};

    if (!Object.keys(chapterData).length) {
      document.getElementById('verseDisplay').innerText = "❌ No verses found for your selection.";
      return;
    }

    let text = "";

    for (const key in chapterData) {
      const [chapterNumber, verseNumber] = key.split(":");
      if (chapterNumber === chapter) {
        if (end === 'full' || (parseInt(verseNumber) >= start && parseInt(verseNumber) <= end)) {
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

    const speech = new SpeechSynthesisUtterance(verses[currentIndex].innerText.replace(/^\d+:\s*/, ''));
    speech.onend = () => {
      currentIndex++;
      readAndProgress();
    };

    speechSynthesis.speak(speech);
  }

  speechSynthesis.cancel();
  readAndProgress();
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

