const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = "MyPremiumSecretKey";

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists! login instead",
      });
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    const newUser = await user.save();
    res.status(201).json({
      message: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (!existingUser) {
      return res.status(404).json({
        message: "User does not exist please Signup",
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    // console.log(isPasswordCorrect);
    if (!isPasswordCorrect) {
      return res.status(404).json({
        message: "password is incorrect",
      });
    }
    const token = jwt.sign({ id: existingUser.id }, JWT_SECRET_KEY, {
      expiresIn: "30s",
    });

    res.cookie(String(existingUser.id), token, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 30),
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Successfully login",
      existingUser,
      token,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const verifyToken = (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  //   console.log(token);

  if (!token) {
    return res.status(401).json({
      message: "No token found",
    });
  }

  jwt.verify(String(token), JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({
        message: "Invalid Token",
      });
    }
    req.id = user.id;
    next();
  });
};

const getUser = async (req, res) => {
  const userId = req.id;
  //   console.log(userId);
  let user;
  try {
    user = await User.findById(userId, "-password");
    return res.status(201).json({
      user,
    });
  } catch (err) {
    return new Error(err);
  }
};

module.exports = { signup, login, verifyToken, getUser };
