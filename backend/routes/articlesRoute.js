import express from "express";
import authenticateToken from "../middleware/auth.js";
import { getArticles } from "../controllers/articlesController.js";

const articlesRouter = express.Router();

articlesRouter.get("/get", authenticateToken, getArticles);

export default articlesRouter;
