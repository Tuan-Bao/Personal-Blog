import fs from "fs";

const userFilePath =
  "D:\\web\\Backend\\Personal Blog\\backend\\data\\user.json";

const checkUserId = (userId) => {
  let data = fs.readFileSync(userFilePath, "utf8");
  data = JSON.parse(data);
  const user = data.find((user) => user.id === userId);
  if (user) {
    return true;
  }
  return false;
};

export default checkUserId;
