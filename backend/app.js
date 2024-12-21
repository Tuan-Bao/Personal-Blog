import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import userRouter from "./routes/userRoute.js";
import articlesRouter from "./routes/articlesRoute.js";
import adminRouter from "./routes/adminRoute.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/articles", articlesRouter);
app.use("/api/admin", adminRouter);

export default app;
