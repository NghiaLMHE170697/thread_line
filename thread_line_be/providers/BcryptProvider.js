const bcrypt = require("bcrypt");

const generateHashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(
        password,
        parseInt(process.env.SECRET_PASSWORD)
    );
    return hashedPassword;
};

const isMatch = async (inputPassword, hashedPassword) => {
    return await bcrypt.compare(inputPassword, hashedPassword);
}

module.exports = {
    generateHashPassword,
    isMatch,
}