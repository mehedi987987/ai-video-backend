export default function handler(req, res) {
  // ✅ Allow requests from anywhere (CORS fix)
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

  res.status(200).json({
    status: "success",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    your_prompt: prompt || "No prompt received"
  });
}
