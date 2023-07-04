import mongoose from "mongoose";

async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/authService');
        console.log("Database has been connected");
    } catch (error) {
        console.log("database wont be able to connect");
    }
}
main()