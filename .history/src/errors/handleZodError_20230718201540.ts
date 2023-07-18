import { ZodError } from "zod";

const handleZodError = (err:ZodError) => {


    const statusCode = 400;
    return {
        statusCode, 
        message : "validation Error", 
        errorMessages : err
    }
}

export default handleZodError;