const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const Router = require("./routers"); // Adjust based on your folder structure
const path = require("path");

dotenv.config();

const app = express();

const secretKey = process.env.SECRET_KEY;
const dbURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

if (!secretKey || !dbURI) {
  console.error("Error: Required environment variables are not defined.");
  process.exit(1);
}

console.log("MongoDB URI:", dbURI);
mongoose.set('strictQuery', true);

app.use(express.json());
app.use(cookieParser());
app.use(Router);

// Connect to MongoDB and start the server
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Handle 404 errors
app.use((req, res) => {
  res.status(404).send("Not Found");
});
