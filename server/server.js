const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const app = express();


const allowedOrigins = [
  'https://3d-viewer-frontend.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: ['http://localhost:5173', 'https://3d-viewer-frontend.vercel.app'],
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Optional

const modelRoutes = require("./routes/modelRoutes");
const uploadRoute = require('./routes/upload');
const testRoute = require('./routes/test');

app.use("/api/models", modelRoutes);
app.use("/api", uploadRoute);
app.use("/api/test", testRoute);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
