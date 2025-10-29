import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from 'helmet'
const app = express();


app.use(helmet())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}));

app.get('/',(req,res)=>{
    res.send("API is running....")
})


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser())




export default app;