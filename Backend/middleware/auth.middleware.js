import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const authHeader = req.headers?.authorization;

  let authToken;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    authToken = authHeader.split(" ")[1];
  } else {
    const cookie = req.headers.cookie;

    if (!cookie) return res.status(401).send("Unauthorized.");

    authToken = cookie.split("=")[1];
  }

  if (!authToken) return res.status(401).send("Unauthorized.");

  jwt.verify(authToken, process.env.JWT_SECRET, function (error, data) {
    if (error) {
      return res.status(401).send("Unauthorized.");
    }
   // Attach the decoded payload to req.user
    req.user = data;

    next();
  });
}

export default auth;