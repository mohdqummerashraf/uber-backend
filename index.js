require("dotenv").config(); // Load environment variables
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const connectToDB = require("./db/db"); // Correct import from db.js
const router = require("./routes/index.route");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

 
const PORT = process.env.PORT || 5000;

// Start the server inside an async function
async function startServer() {
  try {
    // Connect to the database
    await connectToDB();
    console.log("Database connected successfully");

    // Use routes
    app.use("/", router);

    app.get('/', (req, res)=>{
      res.send('Hello world');
    })

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Exit with error
  }
}

// Call the function to start the server
startServer();
