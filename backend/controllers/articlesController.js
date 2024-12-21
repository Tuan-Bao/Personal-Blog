import fs from "fs";
import checkUserId from "../utils/checkUser.js";

const articlesFilePath =
  "D:\\web\\Backend\\Personal Blog\\backend\\data\\articles.json";

const saveData = (data) => {
  fs.writeFileSync(articlesFilePath, JSON.stringify(data, null, 2));
};

export const getArticles = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (checkUserId(userId)) {
      const data = fs.readFileSync(articlesFilePath, "utf8");
      return res.json({ success: true, data: JSON.parse(data) });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Eror" });
  }
};

export const addArticle = async (req, res) => {
  try {
    const { title, content, date } = req.body;
    const userId = req.body.userId;
    if (checkUserId(userId)) {
      let data = fs.readFileSync(articlesFilePath, "utf8");
      data = JSON.parse(data);
      const newArticle = {
        id: data.length + 1,
        title: title,
        content: content,
        date: date,
      };
      data.push(newArticle);
      saveData(data);
      return res.json({ success: true, data: data });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Eror" });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id, title, content, date } = req.body;
    const userId = req.body.userId;
    if (checkUserId(userId)) {
      let data = fs.readFileSync(articlesFilePath, "utf8");
      data = JSON.parse(data);

      const indexArticleUpdate = data.findIndex((article) => article.id === id);
      if (indexArticleUpdate === -1) {
        return res.json({ success: false, message: "Article not found" });
      }
      data[indexArticleUpdate] = {
        ...data[indexArticleUpdate],
        title,
        content,
        date,
      };

      saveData(data);
      return res.json({ success: true, data: data });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Eror" });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id, userId } = req.body;
    if (checkUserId(userId)) {
      let data = fs.readFileSync(articlesFilePath, "utf8");
      data = JSON.parse(data);

      const indexArticleDelete = data.findIndex((article) => article.id === id);
      if (indexArticleDelete === -1) {
        return res.json({ success: false, message: "Article not found" });
      }
      data.forEach((article) => {
        if (article.id > indexArticleDelete) {
          article.id -= 1;
        }
      });
      data.splice(indexArticleDelete, 1);
      saveData(data);

      return res.json({ success: true, data: data });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Eror" });
  }
};
