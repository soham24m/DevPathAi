const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate-roadmap', async (req, res) => {
  const { goal, weeks } = req.body;

  const prompt = `You are a senior software engineer. A student wants to: "${goal}" in ${weeks} weeks. Respond ONLY with valid JSON, no markdown, no extra text: {"title":"roadmap title","goal":"${goal}","totalWeeks":${weeks},"weeks":[{"week":1,"theme":"theme","tasks":["task1","task2","task3","task4"],"resources":["resource1","resource2"],"milestone":"milestone"}]} Include exactly ${weeks} week objects.`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const roadmap = JSON.parse(jsonMatch[0]);
    res.json({ success: true, roadmap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/youtube', async (req, res) => {
  const { q } = req.query;
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&maxResults=4&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await response.json();
    const videos = data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channel: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url
    }));
    res.json({ videos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});