import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const userFilePath =
  "D:\\web\\Backend\\Personal Blog\\backend\\data\\user.json";
const SECRET_KEY = process.env.SECRET_KEY;

const getUsers = () => {
  const data = fs.readFileSync(userFilePath, "utf8");
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), "utf8");
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  if (users.length) {
    const userExist = users.find((user) => user.username === username);
    if (userExist) {
      return res.json({ success: false, message: "Username already exists" });
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username: username,
    password: hashedPassword,
  };

  users.push(newUser);
  saveUsers(users);
  res.json({ success: true, message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  const users = getUsers();
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.json({ success: false, message: "Invalid username" });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ success: true, token });
};
