const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs"); // only once here
// const cors = require("cors");


dotenv.config();
const app = express();

app.use(cors({
  origin: "https://3d-viewer-frontend.vercel.app" // ✅ this is enough
}));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Optional

// Ensure /temp folder exists
const tempDir = path.join(__dirname, "../temp");
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Routes
const modelRoutes = require("./routes/modelRoutes");
const uploadRoute = require('./routes/upload');
const testRoute = require('./routes/test');

app.use("/api/models", modelRoutes);
app.use("/api", uploadRoute);
app.use("/api/test", testRoute);


app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(500).json({ success: false, message: err.message });
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
