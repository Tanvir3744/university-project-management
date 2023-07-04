import mongoose from "mongoose";
import app from "./app"
import {port} from "./app"
async function main() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/authService');

        // check the datbase is connected or not through console
        console.log("Database has been connected");

        // listening the port with this function
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          })
    } catch (error) {
        console.log("database wont be able to connect", error);
    }
}
main()