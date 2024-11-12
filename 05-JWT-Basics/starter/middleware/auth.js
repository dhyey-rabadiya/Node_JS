const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");
const UnauthencatedRequest = require("../errors/unauthenticated");
const BadRequest = require("../errors/bad-request");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new UnauthencatedRequest("No token provided");
  }
  if (!authHeader.startsWith("Bearer ")) {
    throw new UnauthencatedRequest(
      "Please provide the correct token to access the secret data"
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    // Here we are verifying the token that comes as an authorization header and if the token gets verified then we pass the data as a object in req.user to the further process, which here is the route that has called authMiddleware before actually executing its own code
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new BadRequest("Not authorized to access this route");
  }
};

module.exports = authMiddleware;
