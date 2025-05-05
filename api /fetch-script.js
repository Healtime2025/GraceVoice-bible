// 📖 GraceVoice Scripture Proxy API
// Forwards book & chapter requests to Google Apps Script backend

export default async function handler(req, res) {
  const { book, chapter, translation = "web" } = req.query;

  // 🚫 Validate inputs
  if (!book || !chapter) {
    return res.status(400).json({ error: "❌ Missing book or chapter." });
  }

  const safeBook = encodeURIComponent(book.trim());
  const safeChapter = encodeURIComponent(chapter.trim());
  const safeTranslation = encodeURIComponent(translation.trim());

  const scriptUrl = `https://script.google.com/macros/s/AKfycbxkGuDg_j0pU5TSZe87arP2JtVcoFZaCBQiEKMaTUyyPlVmk8XBFC0jpB3TyctCIA0aqQ/exec?book=${safeBook}&chapter=${safeChapter}&translation=${safeTranslation}`;

  try {
    const response = await fetch(scriptUrl);
    const data = await response.json();

    // 📭 No verses found
    if (!data.verses || Object.keys(data.verses).length === 0) {
      return res.status(404).json({ error: `No verses found for ${book} ${chapter}.` });
    }

    // ✅ Success
    return res.status(200).json(data);
  } catch (err) {
    // 🛑 Catch & log error
    console.error("GraceVoice proxy error:", err.message);
    return res.status(500).json({
      error: "GraceVoice proxy error",
      details: err.message
    });
  }
}
