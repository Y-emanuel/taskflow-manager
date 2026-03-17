import express from 'express';
import Task from '../models/Task.js';

const router = express.Router();

// GET todas las tareas
router.get('/', async (req, res) => {
  try {
    console.log('📡 GET /api/tasks - Consultando tareas...');
    const tasks = await Task.find().sort({ createdAt: -1 });
    console.log(`✅ Encontradas ${tasks.length} tareas`);
    res.json(tasks);
  } catch (error) {
    console.error('❌ Error en GET /api/tasks:', error.message);
    res.status(500).json({ message: 'Error consultando tareas', error: error.message });
  }
});

// POST crear tarea
router.post('/', async (req, res) => {
  try {
    console.log('📡 POST /api/tasks - Creando tarea:', req.body.text);
    const task = await Task.create({
      text: req.body.text,
      completed: req.body.completed || false,
    });
    console.log('✅ Tarea creada:', task._id);
    res.status(201).json(task);
  } catch (error) {
    console.error('❌ Error en POST /api/tasks:', error.message);
    res.status(400).json({ message: 'Error creando tarea', error: error.message });
  }
});

// PUT actualizar tarea
router.put('/:id', async (req, res) => {
  try {
    console.log('📡 PUT /api/tasks/:id - Actualizando:', req.params.id);
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
    console.error('❌ Error en PUT /api/tasks/:id:', error.message);
    res.status(400).json({ message: 'Error actualizando tarea', error: error.message });
  }
});

// DELETE eliminar tarea
router.delete('/:id', async (req, res) => {
  try {
    console.log('📡 DELETE /api/tasks/:id - Eliminando:', req.params.id);
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    console.log('✅ Tarea eliminada');
    res.json({ message: 'Tarea eliminada', id: req.params.id });
  } catch (error) {
    console.error('❌ Error en DELETE /api/tasks/:id:', error.message);
    res.status(500).json({ message: 'Error eliminando tarea', error: error.message });
  }
});

export default router;