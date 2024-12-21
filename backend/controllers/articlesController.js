import fs from "fs";
import checkUserId from "../utils/checkUser.js";

const articlesFilePath =
  "D:\\web\\Backend\\Personal Blog\\backend\\data\\articles.json";

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
