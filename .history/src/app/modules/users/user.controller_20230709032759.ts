import { Request, Response } from "express";
import user_service from "./user_service";

export const createUser = async (req: Request, res: Response) => {
   try {
    const result = await user_service.createUser();
    
   } catch (error) {
       res.status(400).json({
        status: "Failed",
    })
   }
}