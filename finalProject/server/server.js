import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import route handlers
import goalsRouter from './src/routes/goals.js';
import authRouter from './src/routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/myapp');

const db = mongoose.connection; //establish database connection and check for errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use imported routes
app.use('/api/goals', goalsRouter);
app.use('/api/auth', authRouter);
app.get('/api/health', (req, res) => {
    const dbState = mongoose.connection.readyState === 1 ? "Up" : "Down";
  res.status(200).json({"status": "Up", 
    "database": dbState,
    "uptime": process.uptime(),
    "timestamp": new Date().toISOString()
  });
})

// Handle 404 for unknown routes
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});