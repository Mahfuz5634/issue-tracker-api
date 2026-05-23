import type { Request, Response } from "express";
import { AuthService } from "./auth.service";
import { loginSchema, signupSchema } from "./auth.validate";

export const AuthController={
     async signup(req: Request,res:Response){
        try{

          const validatedData=signupSchema.parse(req.body);
          const user = await AuthService.signup(validatedData);

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

            const validatedData=loginSchema.parse(req.body);
            const result=await AuthService.login(validatedData);

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