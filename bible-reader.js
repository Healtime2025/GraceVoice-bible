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
    const start = document.getElementById('start-verse').value;
    const end = document.getElementById('end-verse').value;

    const url = `https://raw.githubusercontent.com/Healtime2025/GraceVoice-online/main/bibles/English/KJV/${book}.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to load Bible file.");

    const data = await response.json(); // Corrected data definition
    const chapterData = data[book][chapter];

    if (!chapterData) {
      document.getElementById('verseDisplay').innerText = "❌ No verses found for your selection.";
      return;
    }

    let text = "";
    for (let i = start; i <= end; i++) {
      const verseKey = `${chapter}:${i}`;
      if (chapterData[verseKey]) {
        text += `${i}: ${chapterData[verseKey]}\n`;
      }
    }

    document.getElementById('verseDisplay').innerText = text.trim() || "❌ No verses available for your selection.";
  } catch (error) {
    console.error("Error loading Bible: ", error);
    document.getElementById('verseDisplay').innerText = "❌ Error loading Bible text. Check console for details.";
  }
}

// Read Highlighted Text
export function readHighlighted() {
  const selection = window.getSelection().toString();
  if (selection) {
    const cleanText = selection.replace(/^[0-9]+:/, '');
    const speech = new SpeechSynthesisUtterance(cleanText);
    speechSynthesis.speak(speech);
  } else {
    alert("Please highlight text first.");
  }
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

