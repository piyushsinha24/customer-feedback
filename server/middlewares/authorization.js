import jwt from "jsonwebtoken";

const config = process.env;

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res
      .status(403)
      .send({ status: "failed", message: "token needed for authorization!" });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (e) {
    return res
      .status(401)
      .send({ status: "failed", message: "invalid token!" });
  }
  return next();
};

export default verifyToken;
