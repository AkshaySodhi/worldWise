import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import path from "path";

import authRoutes from "./routes/auth.routes.js";
import cityRoutes from "./routes/city.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToDB from "./db/connectToDB.js";

dotenv.config("");
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);
app.use("/api/user",userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  connectToDB();
  console.log(`server listening at port: ${PORT} `);
});
