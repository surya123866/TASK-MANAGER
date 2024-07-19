const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
const axios = require("axios");

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json("All fields are required");
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json("This Email is already registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picture: "",
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        firstName,
        lastName,
        email,
      },
    });
  } catch (error) {
    res.status(500).json("User registration failed");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json("Invalid email");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json("Invalid password");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "10h",
    });
    res.json({
      message: "logged in successfully",
      token,
      user: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json("Login failed");
  }
};


exports.googleAuth = async (req, res) => {
  try {
    const { accessToken } = req.body;
    if (!accessToken) {
      return res.status(400).json("Authentication error");
    }

    const url = "https://www.googleapis.com/oauth2/v3/userinfo";
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const { given_name, family_name, email, sub, picture } = response.data;
    const [user, created] = await User.upsert(
      {
        firstName: given_name,
        lastName: family_name,
        email,
        googleId: sub,
        profileImage: picture,
      },
      { returning: true }
    );

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
    // console.error("Error during Google login:", error);
    res.status(500).json("Google login failed" );
  }
};
