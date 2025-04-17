

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { OpenAI } = require("openai");
const mongoose = require("mongoose");
const Faq = require("./models/Faq.js");

dotenv.config();


const app = express();
const port = process.env.PORT || 3001;



const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"));

app.post("/api/chat", async (req, res) => {
  const userMessages = req.body.messages;
  const lastMessage = userMessages[userMessages.length - 1]?.content.toLowerCase();

  try {
    // 1. Check MongoDB for a matching question
    const match = await Faq.findOne({
      question: { $regex: new RegExp(lastMessage, "i") },
    });

    if (match) {
      return res.json({ reply: { role: "assistant", content: match.answer } });
    }

    // 2. Fallback to OpenAI
    const { OpenAI } = require("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      messages: userMessages,
      model: "gpt-3.5-turbo",
    });

    const reply = response.choices[0].message;
    res.json({ reply });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ reply: { role: "assistant", content: "Server error." } });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
