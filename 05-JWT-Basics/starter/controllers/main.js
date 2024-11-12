const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new CustomAPIError("Please provide the username and password", 400);
  }

  const id = new Date().getDate();

  // To create a jwt token, this is how it works, takes three arguements, payload, secret and the object that specifies properties like expires in and all the stuff
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(201).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  // get the authorization bearer token from request headers and then validate the token, if the token is valid, then and then only send the secret lucky

  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: "Success",
    secret: `Hii ${req.user.username}, Here is your secret, your lucky number is ${luckyNumber}`,
  });
};

module.exports = { login, dashboard };
