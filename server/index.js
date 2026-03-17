import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import taskRoutes from './routes/tasks.js';

dotenv.config();

const app = express();

// ✅ CORS PERMISIVO PARA DEMO
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Log de requests
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// ✅ Conectar a MongoDB (sin cerrar el server si falla)
console.log('🔍 Iniciando conexión a MongoDB...');
connectDB().then((conn) => {
  if (conn) {
    console.log('✅ MongoDB listo');
  } else {
    console.warn('⚠️ MongoDB no conectado - Usando fallback si está configurado');
  }
});

// Rutas (pasar conexión o null)
app.use('/api/tasks', (req, res, next) => {
  req.mongodbConnected = true; // Podés usar esto en las rutas si querés
  next();
}, taskRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API TaskFlow Manager funcionando 🚀',
    author: 'Brian Emanuel Ybalo',
    timestamp: new Date().toISOString(),
    mongodb: process.env.MONGODB_URI ? 'Configurado' : 'No configurado'
  });
});

// ✅ Manejo global de errores
app.use((err, req, res, next) => {
  console.error('❌ Error no manejado:', err);
  res.status(500).json({ 
    error: 'Error interno del servidor', 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// ✅ Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🔥 Servidor corriendo en puerto ${PORT}`);
  console.log(`🌐 URL: https://taskflow-api-nzkl.onrender.com`);
});