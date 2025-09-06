export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { prompt } = req.body || {};

  try {
    // ✅ Try Gemini 1.5 Flash model (text output)
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GOOGLE_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }]}],
        }),
      }
    );

    const data = await response.json();

    // Debug log করতে Response ফেরত দেই
    if (data && data.candidates && data.candidates[0].content.parts[0].text) {
      return res.status(200).json({
        status: "success",
        ai_output: data.candidates[0].content.parts[0].text,
        your_prompt: prompt,
      });
    } else {
      return res.status(500).json({ 
        status: "fail",
        message: "No response from AI", 
        raw: data   // Debugging info পাঠাচ্ছি
      });
    }
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
}
