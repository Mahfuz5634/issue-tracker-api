import type { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import router from "./app/modules/auth.route";
import issueRouter from "./app/modules/issues/issue.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Server Is Running",
  });
});

app.use("/api/auth", router);
app.use("/api/issues", issueRouter);
export default app;
