import mongoose from "mongoose";
import { IGenericErrorMessage } from "../interfaces/error";

const handleValidationError = (err: mongoose.Error.ValidationError) => {
    const errors: IGenericErrorMessage[] = Object.values(err.errors).map((elem: mongoose.Error.ValidationError | mongoose.Error.CastError) => {

    })
}