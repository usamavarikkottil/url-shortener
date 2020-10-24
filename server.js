const express = require('express');
const app = express();
const connectDB = require("./config/db");
require("dotenv").config();

app.use(express.json());

// Connect to Database
connectDB();


// Routes
app.use("/", require("./routes/index"));
app.use("/api/url", require("./routes/url"));



const port = process.env.port || 5000
app.listen(port, () => console.log("server started...."));
