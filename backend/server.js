const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const modelRoutes = require('./routes/modelRoutes');
const cors = require('cors');
dotenv.config();

const app = express();

// Add this before routes
app.use(cors({
  origin: 'https://3d-model-viewer-frontend-eight.vercel.app',
  credentials: true,
}));


app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Routes
app.use('/api/models', modelRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
