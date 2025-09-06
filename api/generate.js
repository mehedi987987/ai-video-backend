export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { prompt } = req.body || {};

  res.status(200).json({
    status: "success",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4",
    your_prompt: prompt || "No prompt received"
  });
}
