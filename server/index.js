import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

// ✅ LOG DE CONEXIÓN A MONGODB
console.log('🔍 Conectando a MongoDB...');
connectDB()
  .then(() => console.log('✅ MongoDB conectado exitosamente'))
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  });

const app = express();

// ✅ CORS PERMISIVO PARA DEMO (solución temporal)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ LOG DE RUTAS
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/tasks', taskRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API TaskFlow Manager funcionando 🚀',
    author: 'Brian Emanuel Ybalo',
    timestamp: new Date().toISOString()
  });
});

// ✅ Manejo global de errores
app.use((err, req, res, next) => {
  console.error('❌ Error no manejado:', err);
  res.status(500).json({ error: 'Error interno del servidor', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
});