import express from "express"; 
import bodyParser from "body-parser";                 
import path from "path";                              
import cors from "cors";   
import type { Request, Response } from "express";
import router from "./router";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api", router);

export default app;