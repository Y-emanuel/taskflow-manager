import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    console.log('🔍 Intentando conectar a MongoDB...');
    console.log('🔍 URI (ocultando password):', process.env.MONGODB_URI?.replace(/:[^@]+@/, ':***@'));
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`✅ MongoDB Conectado: ${conn.connection.host}`);
    return conn;
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:');
    console.error('   - Nombre del error:', error.name);
    console.error('   - Mensaje:', error.message);
    console.error('   - Causa:', error.cause);
    
    // ⚠️ NO cerrar el servidor inmediatamente para debug
    // process.exit(1);
    
    // En su lugar, retornar null para que las rutas puedan manejar el fallback
    return null;
  }
};

export default connectDB;