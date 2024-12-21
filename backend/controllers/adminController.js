import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";
configDotenv();

const adminFilePath =
  "D:\\web\\Backend\\Personal Blog\\backend\\data\\admin.json";
const SECRET_KEY = process.env.SECRET_KEY;

const getAdmins = () => {
  const data = fs.readFileSync(adminFilePath, "utf8");
  return JSON.parse(data);
};

const saveAdmins = (admins) => {
  fs.writeFileSync(adminFilePath, JSON.stringify(admins, null, 2), "utf8");
};

export const register = async (req, res) => {
  const { username, password } = req.body;
  const admins = getAdmins();

  if (admins.length) {
    const adminExist = admins.find((admin) => admin.username === username);
    if (!adminExist) {
      return res.json({ success: false, message: "Username already exists" });
    }
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = {
    id: admins.length + 1,
    username: username,
    password: hashedPassword,
  };

  admins.push(newAdmin);
  saveAdmins(admins);
  return res.json({ success: true, message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  const admins = getAdmins();
  const admin = admins.find((admin) => admin.username === username);
  if (!admin) {
    return res.json({ success: false, message: "Invalid username" });
  }

  const isPasswordMatch = await bcrypt.compare(password, admin.password);
  if (!isPasswordMatch) {
    return res.json({ success: false, message: "Invalid password" });
  }

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  return res.json({ success: true, token });
};
