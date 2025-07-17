// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const path = require("path");

// const app = express();
// dotenv.config();

// // ✅ CORS Setup
// const allowedOrigins = [
//   'https://3d-viewer-frontend.vercel.app',
//   // 'http://localhost:3000' // 👈 Uncomment this during local development if needed
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('❌ CORS not allowed from this origin'));
//     }
//   },
//   credentials: true
// }));

// // ✅ Middleware
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ✅ Routes
// const cloudinaryTestRoute = require('./routes/test');
// const modelRoutes = require("./routes/modelRoutes");
// const uploadRoute = require('./routes/upload');

// app.use('/api/test', cloudinaryTestRoute);
// app.use("/api/models", modelRoutes);
// app.use('/api', uploadRoute);

// // ✅ Connect MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch((err) => console.error("❌ MongoDB connection error:", err));

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// ✅ CORS Fix (FULLY Open or Domain Specific)
app.use(cors({
  origin: ['https://3d-viewer-frontend.vercel.app'],  // ✅ allow vercel
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Routes
const modelRoutes = require("./routes/modelRoutes");
const uploadRoute = require('./routes/upload');
const testRoute = require('./routes/test');

app.use("/api/models", modelRoutes);
app.use("/api", uploadRoute);
app.use("/api/test", testRoute);

// ✅ DB Connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
