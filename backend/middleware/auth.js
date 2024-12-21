import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.json({ success: false, message: "No token provided" });
  }

  try {
    const token_decode = jwt.verify(token, process.env.SECRET_KEY);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export default authenticateToken;
