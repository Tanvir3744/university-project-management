import express from "express";
import validateRequest from "../../middlewares/validateRequest";
const router = express.Router();

router.post("/create-department", validateRequest())