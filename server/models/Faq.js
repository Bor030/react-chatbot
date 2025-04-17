const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String,
});

const Faq = mongoose.model("Faq", faqSchema, "faq"); // "faq" is your collection name


module.exports = Faq;
