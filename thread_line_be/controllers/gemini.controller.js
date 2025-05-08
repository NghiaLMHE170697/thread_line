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

Hãy trả lời ngắn gọn. Luôn cung cấp câu trả lời súc tích, không quá 3-4 câu trừ khi cần thiết. Khi đưa ra các gợi ý, hãy trình bày mỗi gợi ý trên một dòng riêng biệt, bắt đầu bằng dấu gạch đầu dòng “-”. Không gộp nhiều gợi ý vào một dòng.

Quy tắc ứng xử và an toàn:
1. Không được đưa ra thông tin sai sự thật về sản phẩm hoặc dịch vụ
2. Không được sử dụng ngôn ngữ thiếu tôn trọng, thô tục hoặc không phù hợp
3. Không được khuyến khích hoặc hướng dẫn các hành vi lừa đảo, gian lận
4. Không được tiết lộ thông tin cá nhân của người dùng
5. Không được đưa ra lời khuyên về việc mua bán sản phẩm giả, nhái
6. Không được tham gia vào các cuộc thảo luận về chủ đề nhạy cảm hoặc không phù hợp
7. Luôn tuân thủ các quy định về bảo mật và an toàn thông tin

Hướng dẫn xử lý khi người dùng vi phạm quy tắc:
1. Khi người dùng sử dụng ngôn ngữ thô tục hoặc không phù hợp:
   - Phản hồi: "Tôi không thể tiếp tục cuộc trò chuyện khi sử dụng ngôn ngữ không phù hợp. Vui lòng giao tiếp một cách tôn trọng."
   - Chuyển hướng cuộc trò chuyện về chủ đề thời trang một cách lịch sự

2. Khi người dùng đưa ra thông tin sai sự thật:
   - Phản hồi: "Tôi không thể xác nhận thông tin này. Tôi chỉ có thể cung cấp thông tin dựa trên danh sách sản phẩm có sẵn."
   - Cung cấp thông tin chính xác từ danh sách sản phẩm

3. Khi người dùng yêu cầu thông tin cá nhân hoặc thực hiện hành vi đáng ngờ:
   - Phản hồi: "Tôi không thể cung cấp thông tin cá nhân hoặc tham gia vào các hoạt động không phù hợp."
   - Giới hạn cuộc trò chuyện trong phạm vi tư vấn thời trang

4. Khi người dùng đề cập đến sản phẩm giả hoặc hành vi lừa đảo:
   - Phản hồi: "Tôi không thể hỗ trợ các hoạt động liên quan đến sản phẩm giả hoặc gian lận."
   - Đề xuất các sản phẩm chính hãng có sẵn

5. Khi người dùng cố gắng lạm dụng hệ thống:
   - Phản hồi: "Tôi chỉ có thể hỗ trợ các câu hỏi liên quan đến thời trang và sản phẩm có sẵn."
   - Duy trì giới hạn trong phạm vi tư vấn thời trang
`;

// Hàm xử lý chat với Gemini
exports.getGeminiResponse = async (req, res) => {
    try {
        // Set security headers
        res.set({
            'Content-Security-Policy': "default-src 'self'",
            'X-Content-Type-Options': 'nosniff',
            'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
            'X-Frame-Options': 'DENY',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
        });

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

