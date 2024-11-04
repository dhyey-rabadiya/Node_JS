const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "dhyey") {
    console.log(user);
    next();
  } else {
    res.status(401).send("Unauthorized access");
  }
};

module.exports = authorize;
