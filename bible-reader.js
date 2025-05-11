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

    if (end === 'full') { // Load full chapter if no end verse
      for (const key in chapterData[chapter]) {
        text += `${key}: ${chapterData[chapter][key]}\n`;
      }
    } else {
      for (let i = start; i <= end; i++) {
        const verseKey = `${chapter}:${i}`;
        for (const chapterKey in chapterData) {
          if (chapterData[chapterKey] && chapterData[chapterKey][verseKey]) {
            text += `${i}: ${chapterData[chapterKey][verseKey]}\n`;
          }
        }
      }
    }

    document.getElementById('verseDisplay').innerText = text.trim() || "❌ No verses available for your selection.";

  } catch (error) {
    console.error("Error loading Bible: ", error);
    document.getElementById('verseDisplay').innerText = "❌ Error loading Bible text. Check console for details.";
  }
}

// Start Reading with Highlight
export function startReadingWithHighlight() {
  const textElement = document.getElementById('verseDisplay');
  const text = textElement.innerText.split('\n');

  let currentIndex = 0;

  function highlightAndRead() {
    if (currentIndex >= text.length) return; // End reading

    textElement.innerHTML = text
      .map((line, index) => index === currentIndex ? `<mark>${line}</mark>` : line)
      .join('<br>');

    const speech = new SpeechSynthesisUtterance(text[currentIndex].replace(/^\d+:\s*/, ''));
    speechSynthesis.speak(speech);

    speech.onend = () => {
      currentIndex++;
      highlightAndRead();
    };
  }

  speechSynthesis.cancel(); // Ensure no other speech is playing
  highlightAndRead();
}

// Stop Reading
export function stopReading() {
  speechSynthesis.cancel();
  document.getElementById('verseDisplay').innerHTML = document.getElementById('verseDisplay').innerText;
}

// Start Voice Command
export function startVoiceCommand() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.onresult = function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    document.getElementById("verseDisplay").innerText = `Command: ${command}`;
  };
  recognition.start();
}
