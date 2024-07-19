const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
require("dotenv").config();
require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { sequelize } = require("./models");
const morgan = require("morgan");
const logger = require("./logger");
const cors = require("cors");
require("dotenv").config();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/api", taskRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong" });
});

sequelize
  .sync()
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    })
  )
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
