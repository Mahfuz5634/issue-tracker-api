import { db } from "../config/db"



export const testDbConnection = async()=>{
    try{
        const result= await db.query("SELECT NOW()");
        console.log("DB CONNECTED:", result.rows[0]);
    }catch(error){
       console.log(error);
    }
}