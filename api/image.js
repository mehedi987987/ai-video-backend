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
    // 🟢 Demo Random Photo API
    const demoImage = "https://picsum.photos/512?random=" + Math.floor(Math.random()*1000);

    res.status(200).json({
      status: "success",
      image_url: demoImage,
      your_prompt: prompt
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: err.message });
  }
}
