const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const logger = require("../logger");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: "User registration failed" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.googleAuth = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, sub, picture } = ticket.getPayload();
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        firstName: name.split(" ")[0],
        lastName: name.split(" ").slice(1).join(""),
        email,
        googleId: sub,
        profileImage: picture,
      });
    }
    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    res.json({ token: jwtToken });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ error: "Google login failed" });
  }
};
