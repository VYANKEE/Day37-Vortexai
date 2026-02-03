const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAI = require('openai');

// Load secrets from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json());

// ---------------------------------------------------------
// NVIDIA SETUP (Tere code ke hisaab se updated)
// ---------------------------------------------------------
const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY, // .env se key lega
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

// TEST ROUTE
app.get('/', (req, res) => {
  res.send('Server is running properly!');
});

// CHAT ROUTE
app.post('/api/chat', async (req, res) => {
  const { message, history } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      // Tera naya model
      model: "meta/llama-3.1-70b-instruct",
      
      messages: [
        // System Prompt: AI ko batana ki wo kaun hai
        { 
          role: "system", 
          content: "You are a helpful, smart, and friendly AI assistant. Keep your answers concise." 
        },
        
        // Purani yaadein (Memory)
        ...(history || []), 
        
        // Abhi ka sawal
        { role: "user", content: message } 
      ],
      
      temperature: 0.2, // Thoda creative kam, logic zyada
      top_p: 0.7,
      max_tokens: 1024,
      stream: false // <--- NOTE: Maine isse false kiya hai taaki React mein easy ho
    });

    // AI ka jawab nikalna
    const aiResponse = completion.choices[0].message.content;
    
    // Frontend ko wapas bhejna
    res.json({ reply: aiResponse });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI connect nahi ho paya" });
  }
});

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});