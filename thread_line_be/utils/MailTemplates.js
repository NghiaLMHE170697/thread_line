const verificationMailHtml = (verificationLink) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email - ThreadLine</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #333333; margin: 0;">Welcome to ThreadLine!</h1>
            </div>
            <div style="padding: 20px; color: #666666;">
                <p>Thank you for signing up! To complete your registration and start using ThreadLine, please verify your email address by clicking the button below:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Verify Email Address</a>
                </div>
                <p>If the button above doesn't work, you can also copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #4CAF50;">${verificationLink}</p>
                <p>This verification link will expire in 24 hours.</p>
                <p>If you didn't create an account with ThreadLine, you can safely ignore this email.</p>
            </div>
            <div style="text-align: center; padding: 20px; color: #999999; font-size: 12px;">
                <p>© ${new Date().getFullYear()} ThreadLine. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

const otpMailHtml = (otp) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP Code - ThreadLine</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; padding: 20px 0;">
                <h1 style="color: #333333; margin: 0;">Your Verification Code</h1>
            </div>
            <div style="padding: 20px; color: #666666;">
                <p>You have requested a verification code for your ThreadLine account. Here is your one-time password (OTP):</p>
                <div style="text-align: center; margin: 30px 0;">
                    <div style="background-color: #f8f8f8; padding: 15px; border-radius: 4px; display: inline-block;">
                        <span style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #4CAF50;">${otp}</span>
                    </div>
                </div>
                <p>This code will expire in 10 minutes.</p>
                <p>If you didn't request this code, please ignore this email or contact our support team if you have concerns about your account security.</p>
            </div>
            <div style="text-align: center; padding: 20px; color: #999999; font-size: 12px;">
                <p>© ${new Date().getFullYear()} ThreadLine. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = {
    verificationMailHtml,
    otpMailHtml
};
