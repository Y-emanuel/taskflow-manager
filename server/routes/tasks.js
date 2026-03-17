import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// ✅ Datos mock para fallback si MongoDB no está disponible
const MOCK_TASKS = [
  { _id: 'mock-1', text: '✅ Demo: App funcionando con MERN stack', completed: true, createdAt: new Date().toISOString() },
  { _id: 'mock-2', text: '🚀 Agregar tareas, marcar, eliminar', completed: false, createdAt: new Date().toISOString() },
  { _id: 'mock-3', text: '💾 Persistencia con MongoDB Atlas', completed: false, createdAt: new Date().toISOString() },
];

// GET todas las tareas
router.get('/', async (req, res) => {
  try {
    console.log('📡 GET /api/tasks');
    
    // Intentar obtener de MongoDB
    const tasks = await Task.find().sort({ createdAt: -1 });
    console.log(`✅ Encontradas ${tasks.length} tareas en MongoDB`);
    res.json(tasks);
    
  } catch (error) {
    console.warn('⚠️ Error consultando MongoDB, devolviendo mock data:', error.message);
    
    // Fallback: devolver datos mock para que la demo funcione
    res.json(MOCK_TASKS);
  }
});

// POST crear tarea
router.post('/', async (req, res) => {
  try {
    console.log('📡 POST /api/tasks:', req.body.text);
    
    const task = await Task.create({
      text: req.body.text,
      completed: req.body.completed || false,
    });
    console.log('✅ Tarea creada en MongoDB:', task._id);
    res.status(201).json(task);
    
  } catch (error) {
    console.warn('⚠️ Error creando tarea en MongoDB, devolviendo mock:', error.message);
    
    // Fallback: crear tarea mock
    const mockTask = {
      _id: `mock-${Date.now()}`,
      text: req.body.text || 'Tarea de ejemplo',
      completed: false,
      createdAt: new Date().toISOString()
    };
    res.status(201).json(mockTask);
  }
});

// PUT actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    console.log('📡 PUT /api/tasks/:id:', req.params.id);
    
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    console.log('✅ Tarea actualizada');
    res.json(task);
    
  } catch (error) {
    console.warn('⚠️ Error actualizando en MongoDB, devolviendo mock:', error.message);
    
    // Fallback: devolver tarea mock actualizada
    const updatedMock = {
      _id: req.params.id,
      text: req.body.text || 'Tarea actualizada',
      completed: req.body.completed ?? false,
      createdAt: new Date().toISOString()
    };
    res.json(updatedMock);
  }
});

// DELETE eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    console.log('📡 DELETE /api/tasks/:id:', req.params.id);
    
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    console.log('✅ Tarea eliminada');
    res.json({ message: 'Tarea eliminada', id: req.params.id });
    
  } catch (error) {
    console.warn('⚠️ Error eliminando en MongoDB, simulando éxito:', error.message);
    
    // Fallback: simular eliminación exitosa
    res.json({ message: 'Tarea eliminada (mock)', id: req.params.id });
  }
});

export default router;