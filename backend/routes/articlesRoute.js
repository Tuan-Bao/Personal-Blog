import express from "express";
import authenticateToken from "../middleware/auth.js";
import {
  addArticle,
  deleteArticle,
  getArticles,
  updateArticle,
} from "../controllers/articlesController.js";

const articlesRouter = express.Router();

articlesRouter.get("/get", authenticateToken, getArticles);
articlesRouter.post("/post", authenticateToken, addArticle);
articlesRouter.put("/put", authenticateToken, updateArticle);
articlesRouter.delete("/delete", authenticateToken, deleteArticle);

export default articlesRouter;
