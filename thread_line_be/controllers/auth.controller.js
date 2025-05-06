const { StatusCodes } = require("http-status-codes");
const ms = require("ms");
const db = require("../models/index");
const { isValidEmail, isValidPassword, generatePassword } = require("../providers/PasswordGenProvider");
const { generateHashPassword } = require("../providers/BcryptProvider");
const JwtProvider = require("../providers/JwtProvider");
const { sendMail } = require("../providers/MailProvider");
const { verificationMailHtml } = require("../utils/MailTemplates");


const register = async (req, res, next) => {
    try {
        const { username, email, password, passwordConfirm } = req.body;
        if (!isValidEmail(email)) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email không hợp lệ",
            });
        }

        if (password && passwordConfirm) {
            if (!isValidPassword(password)) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Mật khẩu không hợp lệ",
                });
            }

            if (password !== passwordConfirm) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    message: "Mật khẩu nhập lại không khớp nhau",
                });
            }
        }

        const existUser = await db.User.findOne({ email: email }).exec();
        if (existUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Email đã tồn tại",
            });
        }

        const passwordGen = password || generatePassword();

        // const hashedPassword = await generateHashPassword(passwordGen);

        const newUser = new db.User({
            email: email,
            password: passwordGen,
            username: username || email.split("@")[0],
            role: "user",
            isActive: false,
        });

        await newUser.save();

        const verificationToken = await JwtProvider.generateToken(
            {
                email: email,
            },
            process.env.VERIFY_EMAIL_TOKEN_SECRET_KEY,
            "1d"
        );

        const verifyUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;

        let result = null;

        result = await sendMail(
            `Threadline-no-reply <${process.env.EMAIL_USER}>`,
            email,
            "Xác nhận tài khoản",
            "Mail này sẽ hết hạn trong 15 phút",
            verificationMailHtml(verifyUrl)
        );

        res.status(StatusCodes.CREATED).json({
            message: "Đăng ký tài khoản thành công, vui lòng kiểm tra email để xác nhận tài khoản",
            data: result,
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Vui lòng nhập email và mật khẩu",
            });
        }

        const existUser = await db.User.findOne({ email: email }).exec();
        if (!existUser) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Tài khoản không tồn tại",
            })
        }
        if (!existUser.isActive) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Tài khoản chưa được xác nhận",
            })
        }

        const isPasswordMatch = existUser.password === password;
        if (!isPasswordMatch) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Mật khẩu không chính xác",
            })
        }

        const token = await JwtProvider.generateToken(
            {
                id: existUser._id,
                email: existUser.email,
                role: existUser.role,
                isActive: existUser.isActive,
            },
            process.env.ACCESS_TOKEN_SECRET_KEY,
            "14d"
        );

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: ms("14d"),
        });

        return res.status(StatusCodes.OK).json({
            message: "Đăng nhập thành công",
            data: {
                token,
                user: {
                    email: existUser.email,
                    username: existUser.username,
                    role: existUser.role,
                    isActive: existUser.isActive,
                    avatar: existUser.avatar,
                }
            }
        })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        })
    }
}

const verifyEmail = async (req, res, next) => {
    const { token } = req.query;
    try {
        const decoded = await JwtProvider.verifyToken(
            token,
            process.env.VERIFY_EMAIL_TOKEN_SECRET_KEY
        );
        console.log(decoded);
        const email = decoded.email;
        const user = await db.User.findOne({ email: email }).exec();
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Tài khoản này không tồn tại",
            });
        }
        if (user.isActive) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Tài khoản này đã xác nhận",
            });
        }
        user.isActive = true;
        await user.save();
        return res.status(StatusCodes.OK).json({
            message: "Xác nhận tài khoản thành công",
        });
    } catch (err) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Mã xác nhận đã hết hạn hoặc không hợp lệ" });
    }
}


module.exports = {
    register,
    login,
    verifyEmail,
}

