import dotenv from "dotenv";
import path from "path";


dotenv.config({path: path.join(process.cwd())}) // this line is for env file which is outside of src folder 