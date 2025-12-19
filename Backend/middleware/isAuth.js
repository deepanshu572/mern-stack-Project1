import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({ message: "User doesn't have token" });
    }
    const verifyToken = jwt.verify(token, process.env.JWT_TOKEN);
    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "some errors in isAuth fnc " + error });
  }
};
export default isAuth;
