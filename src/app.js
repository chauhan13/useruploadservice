require("dotenv").config();
const express = require("express");
const db = require("../src/configuration/connection");
const auth = require("./middleware/middlewareAuth");
const authRoutes = require("./routes/auth");
const fileRoutes = require("./routes/files");

const app = express();
app.use(express.json());
(async () => {
    try {
      await db.query("SELECT 1"); 
      console.log("Connected to MySQL database successfully!");
    } catch (err) {
      console.error("Error connecting to MySQL database:", err);
      process.exit(1);
    }
  })();


// Routes
app.use("/auth", authRoutes);
app.use(auth);
app.use("/files", fileRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
