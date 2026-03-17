import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();
connectDB();

const app = express();

// ✅ CORS CONFIGURADO CON TUS URLS REALES
app.use(cors({
  origin: [
    'https://taskflow-manager-seven.vercel.app',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'API TaskFlow Manager funcionando 🚀',
    author: 'Brian Emanuel Ybalo'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
});