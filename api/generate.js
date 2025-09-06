export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { prompt } = req.body;

  // Demo response
  return res.status(200).json({
    status: "success",
    video_url: "https://www.w3schools.com/html/mov_bbb.mp4"
  });
}
