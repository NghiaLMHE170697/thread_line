const mongoose = require("mongoose");
const User = require("./user.model");

const db = {

}

db.User = User;

db.connectDB = async (req, res, next) => {
    try {
        await mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => console.log("Connected to MongoDB successfully"))
    } catch (error) {
        next(error);
        process.exit();
    }
}

module.exports = db;