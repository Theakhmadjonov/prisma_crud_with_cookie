import express from "express";
import Routes from "./routes.js";
import cookieParser from "cookie-parser";
import { PrismaClient } from "@prisma/client";
import errorMiddleware from "./middlewares/error.middleware.js";
import "dotenv/config";

const app = express();
export const prisma = new PrismaClient();

app.use(cookieParser());
app.use(express.json());
app.use("/api", Routes());
app.use(errorMiddleware);

const PORT = process.env.PORT || 8080;

const bootstrap = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => console.log(`Server is running ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

bootstrap();
