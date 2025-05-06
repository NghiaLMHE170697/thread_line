const nodemailer = require("nodemailer");

const sendMail = async (from, to, subject, text, html) => {
    try {
        const transport = nodemailer.createTransport({
            service: "yahoo",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        const mailOptions = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            html: html,
        };

        const result = await transport.sendMail(mailOptions);
        console.log("Email sent successfully", result);
        return result;
    } catch (error) {
        console.log("Error sending email", error);
        return error;
    }
}

module.exports = {
    sendMail,
}