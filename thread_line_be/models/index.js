const mongoose = require("mongoose");
const User = require("./user.model");

const db = {
    User
}

db.connectDB = async () => {
    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI, options);
            console.log("Connected to MongoDB successfully");
        }
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

// Handle connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Handle process termination
process.on('SIGINT', async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error during MongoDB connection closure:', err);
        process.exit(1);
    }
});

module.exports = db;