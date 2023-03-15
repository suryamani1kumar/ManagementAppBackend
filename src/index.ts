import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import "dotenv/config";
import cors from "cors";
import "./connection/connection";
import { apiErrorHandler } from "./errors/api-error-handler";
import { notFound } from "./middleware/not-found";
import user from "./router/userRoute";
import data from "./router/dataRoute";

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));
app.use(apiErrorHandler);
app.use("/", user);
app.use("/", data);

app.use(notFound);

app.listen(process.env.PORT, (): void => {
  console.log(`Server Running here http://localhost:${process.env.PORT}`);
});
