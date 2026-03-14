const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

async function callGroq(prompt) {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    })
  });
  const data = await response.json();
  return data.choices[0].message.content;
}

app.post('/generate-roadmap', async (req, res) => {
  const { goal, weeks } = req.body;
  const prompt = `You are a senior software engineer. A student wants to: "${goal}" in ${weeks} weeks. Respond ONLY with valid JSON, no markdown, no extra text: {"title":"roadmap title","goal":"${goal}","totalWeeks":${weeks},"weeks":[{"week":1,"theme":"theme","tasks":["task1","task2","task3","task4"],"resources":["resource1","resource2"],"milestone":"milestone"}]} Include exactly ${weeks} week objects.`;
  try {
    const text = await callGroq(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const roadmap = JSON.parse(jsonMatch[0]);
    res.json({ success: true, roadmap });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/daily-plan', async (req, res) => {
  const { theme, tasks, milestone } = req.body;
  const prompt = `You are a coding mentor. Break down this week into a 7-day daily plan.
Week theme: ${theme}
Tasks: ${tasks.join(', ')}
Milestone: ${milestone}
Respond ONLY with valid JSON, no markdown, no extra text:
{"days":[{"day":1,"title":"Monday","focus":"what to focus on today","tasks":["specific task 1","specific task 2"]},{"day":2,"title":"Tuesday","focus":"focus","tasks":["task1","task2"]}]}
Include exactly 7 day objects.`;
  try {
    const text = await callGroq(prompt);
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const plan = JSON.parse(jsonMatch[0]);
    res.json({ success: true, plan });
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
