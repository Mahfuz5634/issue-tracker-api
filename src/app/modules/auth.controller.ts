import type { Request, Response } from "express";
import { AuthService } from "./auth.service";





export const AuthController={
     async signup(req: Request,res:Response){
        try{
          const user = await AuthService.signup(req.body);

          res.status(201).json({
            success:true,
            message:"User registered successfully",
            data:user,
          })
        }
        catch(error:any){
           res.status(400).json({
            success: false,
            message: error.message,
           })
        }
     },


     async login(req:Request,res:Response){
        try{
            const result=await AuthService.login(req.body);

            res.status(200).json({
                success:true,
                message:"Login successfully",
                data: result,
            });
        }catch(error:any){
            res.status(401).json({
                success:false,
                message:error.message,
            })
        }
     }
}