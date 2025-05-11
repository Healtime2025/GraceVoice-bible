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

    if (end === 'full') {
      for (const key in chapterData[chapter]) {
        text += `<div class='verse-line' id='verse-${key}'>${key}: ${chapterData[chapter][key]}</div>\n`;
      }
    } else {
      for (let i = start; i <= end; i++) {
        const verseKey = `${chapter}:${i}`;
        for (const chapterKey in chapterData) {
          if (chapterData[chapterKey] && chapterData[chapterKey][verseKey]) {
            text += `<div class='verse-line' id='verse-${verseKey}'>${i}: ${chapterData[chapterKey][verseKey]}</div>\n`;
          }
        }
      }
    }

    document.getElementById('verseDisplay').innerHTML = text.trim() || "❌ No verses available for your selection.";

    // Reset progress bar
    document.getElementById('readingProgress').style.width = '0%';

  } catch (error) {
    console.error("Error loading Bible: ", error);
    document.getElementById('verseDisplay').innerText = "❌ Error loading Bible text. Check console for details.";
  }
}

// Start Reading
export function startReading() {
  const verses = document.querySelectorAll('.verse-line');
  let currentIndex = 0;

  function readAndProgress() {
    if (currentIndex >= verses.length) return;

    const speech = new SpeechSynthesisUtterance(verses[currentIndex].innerText.replace(/^\d+:\s*/, ''));
    speech.onend = () => {
      currentIndex++;
      updateProgress(currentIndex, verses.length);
      readAndProgress();
    };

    speechSynthesis.speak(speech);
  }

  function updateProgress(current, total) {
    const progress = (current / total) * 100;
    document.getElementById('readingProgress').style.width = `${progress}%`;
  }

  speechSynthesis.cancel();
  readAndProgress();
}

// Stop Reading
export function stopReading() {
  speechSynthesis.cancel();
  document.getElementById('readingProgress').style.width = '0%';
}

// Start Voice Command
export function startVoiceCommand() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.onresult = async function(event) {
    const command = event.results[0][0].transcript.toLowerCase();
    document.getElementById("voiceFeedback").innerText = `You said: "${command}"`;

    const match = command.match(/read (\d+\s?[a-z]+) (\d+)/i);
    if (match) {
      const bookName = match[1].trim();
      const chap = match[2];

      const options = document.getElementById("bookSelect").options;
      for (let option of options) {
        if (option.text.toLowerCase().includes(bookName.toLowerCase())) {
          document.getElementById("bookSelect").value = option.value;
          document.getElementById("chapterInput").value = chap;
          loadBible();
          break;
        }
      }
    } else {
      speak("Sorry, I didn’t understand. Try saying 'Read John 3'.");
    }
  };

  recognition.start();
}
