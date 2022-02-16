const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const imageController = require("./controller");

const app = express();
app.use(cors({
  origin: "http://localhost:5500"
}));
app.use(express.json());

// Routes
app.use("/", imageController);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running or port ${PORT}`);
});
