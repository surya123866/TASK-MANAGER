const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const axios = require("axios");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      picture: "",
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({ error: "Email already in use" });
    } else {
      res.status(500).json({ error: "User registration failed" });
    }
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
    res.json({
      token,
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(400).json({ error: "Access token is required" });
    }

    const url = "https://www.googleapis.com/oauth2/v3/userinfo";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { given_name, family_name, email, sub, picture } = response.data;
    let user = await User.findOne({ where: { email } });

    if (!user) {
      // Create a new user if one does not exist
      user = await User.create({
        firstName: given_name,
        lastName: family_name,
        email,
        googleId: sub,
        profileImage: picture,
      });
    } else {
      // Update googleId and profileImage if not already set
      const updates = {};
      if (!user.googleId) {
        updates.googleId = sub;
      }
      if (!user.profileImage) {
        updates.profileImage = picture;
      }

      if (Object.keys(updates).length > 0) {
        user = await User.update(updates, { where: { email } });
      }
    }

    const jwtToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });

    res.json({
      token: jwtToken,
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        picture: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Error during Google login:", error);
    res.status(500).json({ error: "Google login failed" });
  }
};
