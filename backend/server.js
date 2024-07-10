import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import cityRoutes from "./routes/city.routes.js";
import connectToDB from "./db/connectToDB.js";

dotenv.config("");
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);

app.listen(PORT, () => {
  connectToDB();
  console.log(`server listening at port: ${PORT} `);
});
