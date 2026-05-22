import  type { Application, Request, Response } from "express";
import express from "express"
import cors from "cors"

const app:Application=express();

app.use(cors());
app.use(express.json());

app.get("/",(req:Request,res:Response)=>{
     res.send({
        succes:true,
        message:"Server Is Running"
     })
});

export default app;