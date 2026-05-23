import type { NextFunction } from "express";


const JWT_SECRET=process.env.JWT_SECRET as string;

export const auth=(req:any,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try {
        const decoded=jwt.verify(token,JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid token"});
    }
}


export const roleCheck=(roles:string[])=>{
    return (req:any,res:any,next:any)=>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Forbidden"});
        }
        next();
    }
}