import express from "express"; 
import bodyParser from "body-parser";                 
import path from "path";                              
import cors from "cors";   
import type { Request, Response } from "express";
import router from "./router/index.routes";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger/swagger";

// import "./database/db";


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/api", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;