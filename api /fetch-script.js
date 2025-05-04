// pages/api/fetch-script.js

export default async function handler(req, res) {
  const { book, chapter } = req.query;

  if (!book || !chapter) {
    return res.status(400).json({ error: "Missing book or chapter." });
  }

  const scriptUrl = `https://script.google.com/macros/s/AKfycbxkGuDg_j0pU5TSZe87arP2JtVcoFZaCBQiEKMaTUyyPlVmk8XBFC0jpB3TyctCIA0aqQ/exec?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}`;

  try {
    const response = await fetch(scriptUrl);
    const data = await response.json();

    if (!data.verses || Object.keys(data.verses).length === 0) {
      return res.status(404).json({ error: "No verses found." });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "GraceVoice proxy error", details: err.message });
  }
}
