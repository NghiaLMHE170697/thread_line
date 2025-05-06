const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const httpErrors = require("http-errors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const db = require("./models");
require("dotenv").config();
// Thêm import cho chức năng nhắc nhở

// Khởi tạo Express
const app = express();

// Import Routes
const {
    geminiRouter,
    authRouter,
} = require("./routes");

// Middleware

// ⚡ Bảo mật tốt hơn với Helmet
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                imgSrc: ["'self'", "data:", "blob:"], // Hỗ trợ ảnh từ API
                scriptSrc: ["'self'", "'unsafe-inline'"],
                objectSrc: ["'none'"],
                upgradeInsecureRequests: [],
            },
        },
    })
);

// 🌍 CORS - Hỗ trợ cả dev và production
app.use(
    cors({
        origin: function (origin, callback) {
            // Define allowed origins
            const allowedOrigins = [
                'https://threadline-drab.vercel.app',
                'http://localhost:3000'
            ];
            
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) {
                return callback(null, true);
            }

            try {
                // Normalize URLs by removing trailing slashes
                const normalizedOrigin = origin.replace(/\/$/, '');
                const normalizedAllowedOrigins = allowedOrigins
                    .filter(url => url) // Filter out any undefined/null values
                    .map(url => url.replace(/\/$/, ''));

                if (normalizedAllowedOrigins.includes(normalizedOrigin)) {
                    callback(null, true);
                } else {
                    console.log('CORS blocked for origin:', origin);
                    console.log('Allowed origins:', normalizedAllowedOrigins);
                    callback(new Error('Not allowed by CORS'));
                }
            } catch (error) {
                console.error('CORS error:', error);
                callback(new Error('CORS configuration error'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

// ⚡ Rate Limit (Hạn chế DDoS Attack)
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 phút
//     max: 100, // 100 requests per 15 minutes
//     message: "Too many requests from this IP, please try again later.",
// });

// app.use(limiter);

// 🖼️ Cho phép phục vụ ảnh từ thư mục "uploads"

// 🚀 Kiểm tra API
app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to RESTFul API - NodeJs" });
});

// 🔗 Routing
app.use("/api/gemini", geminiRouter);
app.use("/api/auth", authRouter);

// ❌ Xử lý lỗi 404 (Route không tồn tại)
app.use((req, res, next) => {
    next(httpErrors(404, "Not Found"));
});

// ❌ Xử lý lỗi chung với async
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        error: {
            status: err.status || 500,
            message: err.message || "Internal Server Error",
        },
    });
});

// 🚀 Khởi chạy server
const HOST = process.env.HOST_NAME || "localhost";
const PORT = process.env.PORT || 9999;

const startServer = async () => {
    try {
        await db.connectDB();
        app.listen(PORT, HOST, () => {
            console.log(`🚀 Server running at: http://${HOST}:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;
