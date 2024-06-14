const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const DashboardData = require("./models/DashboardData");

// Initialize the app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Blackcoffer",
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define route to get all data from the "dashboard-data" collection
app.get("/dashboard-data", async (req, res) => {
  try {
    const data = await DashboardData.find().lean();
    res.json(data);
  } catch (err) {
    console.error("Error fetching data: ", err);
    res.status(500).send(err);
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
