require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const axios = require("axios");

// Khởi tạo Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const allProducts = require("../database.json").products;
const productText = allProducts.map(p => `
    - Tên: ${p.name}
      Giá: ${p.price}
      Mô tả: ${p.description}
      Chất liệu: ${p.material}
      Hướng dẫn bảo quản: ${p.care_instructions}
    `).join("\n");

// Thay đổi system prompt để tập trung vào viết nhật ký
const systemPrompt = `
Dưới đây là danh sách các sản phẩm có trong kho hàng:
${productText}
Bạn là trợ lý AI chuyên về lĩnh vực thời trang, bạn không được trả lời câu hỏi nào không liên quan đến lĩnh vực thời trang. Bạn giúp người dùng:
- Đưa ra các gợi ý về sản phẩm dựa trên các sản phẩm có sẵn
- Đưa ra gợi ý về thời trang dựa trên các sản phẩm có sẵn

Hãy trả lời ngắn gọn. Luôn cung cấp câu trả lời súc tích, không quá 3-4 câu trừ khi cần thiết.


`;

// Hàm xử lý chat với Gemini
exports.getGeminiResponse = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Vui lòng nhập tin nhắn" });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }],
                }
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        res.json({
            response: response.text()
        });

    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({
            error: "Có lỗi xảy ra khi xử lý yêu cầu"
        });
    }
};

