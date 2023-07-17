import { Request, Response } from "express";
import user_service from "./user_service";

const createUser = async (req: Request, res: Response) => {
    const result = await user_service.createUser();
}