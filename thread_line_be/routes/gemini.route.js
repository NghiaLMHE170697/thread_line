
const express = require("express");
const { getGeminiResponse } = require("../controllers/gemini.controller");
const geminiRouter = express.Router();
// This route will be accessible at /api/gemini/chatbot
geminiRouter.post("/chatbot", getGeminiResponse);
module.exports = geminiRouter;
