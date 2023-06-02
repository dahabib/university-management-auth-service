import express, { Application } from "express";
import cors from "cors";

const app: Application = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default app;
