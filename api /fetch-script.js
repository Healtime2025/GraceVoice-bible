// GraceVoice - Fetch Scripture API

async function fetchScripture(book, chapter, start = 1, end = "full", translation = "web") {
  try {
    const response = await fetch(`/api/fetch-script.js?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}&translation=${encodeURIComponent(translation)}`);
    if (!response.ok) throw new Error("Failed to load scripture.");

    const data = await response.json();
    if (!data.verses) throw new Error("No verses found.");

    let verseText = "";

    if (end === "full") {
      for (const verseNumber in data.verses) {
        verseText += `${verseNumber}. ${data.verses[verseNumber]}\n`;
      }
    } else {
      for (let i = start; i <= end; i++) {
        if (data.verses[i]) {
          verseText += `${i}. ${data.verses[i]}\n`;
        } else {
          verseText += `${i}. ❌ Verse not found\n`;
        }
      }
    }

    return verseText.trim();
  } catch (error) {
    console.error("Error fetching scripture:", error);
    return "❌ Error fetching scripture. Please try again.";
  }
}

export { fetchScripture };

