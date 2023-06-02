import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors());

//Testing
app.get("/", (req: Request, res: Response) => {
  res.send(`Application started successfully!`);
});

export default app;
