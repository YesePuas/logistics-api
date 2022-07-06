import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(express.json()); //Middleware que transforma la req.body a un JSON.
app.use(cors());
app.use(morgan("dev"));

export default app;
