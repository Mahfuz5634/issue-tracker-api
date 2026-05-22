import { Pool } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

if(!process.env.DB_URL){
    throw new Error("DB_URL is missing in .env");

}

export const db=new Pool({
    connectionString:process.env.DB_URL,
});