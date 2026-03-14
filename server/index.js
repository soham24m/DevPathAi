const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.post('/generate-roadmap', async (req, res) => {
  const { goal, weeks } = req.body;
  const prompt = `You are a senior software engineer. A student wants to: "${goal}" in ${weeks} weeks. Respond ONLY with valid JSON, no markdown, no extra text: {"title":"roadmap title","goal":"${goal}","totalWeeks":${weeks},"weeks":[{"week":1,"theme":"theme","tasks":["task1","task2","task3","task4"],"resources":["resource1","resource2"],"milestone":"milestone"}]} Include exactly ${weeks} week objects.`;

  try {
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
    console.log('Groq response:', JSON.stringify(data).slice(0, 200));
    const text = data.choices[0].message.content;
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const roadmap = JSON.parse(jsonMatch[0]);
    res.json({ success: true, roadmap });
  } catch (err) {
    console.error('ERROR:', err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
