import jwt from "jsonwebtoken";
import config from "../config";
//verifies the jwt token and decides the user is authenticated or not

const isAuth = (req, res, next) => {
  //Checks if authorization header is set and token is present

  const authorization = req.headers["authorization"];
  const token = authorization && authorization.split(" ")[1];
  if (!authorization || !token) {
    return res
      .status(403)
      .json({ err: "Forbidden", reference: "authorization not set" });
  }
  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = {
      username: decoded.username,
      name: decoded.name,
      id: decoded.id,
    };
    next();
  } catch (err) {
    console.log("***isAuthMiddleware error***\n", err);
    return res
      .status(403)
      .json({ err: "Forbidden", reference: "Invalid Token" });
  }
};

export default isAuth;
