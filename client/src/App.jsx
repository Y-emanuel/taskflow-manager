import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiTrash2, FiCheck, FiList, FiClock } from 'react-icons/fi';
import './App.css';

// URL de la API (cambiar en producción)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  // ✅ Cargar tareas al montar el componente (lógica async dentro del effect)
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        const data = await response.json();
        setTasks(data);
        setLoading(false);
      } catch (error) {
        console.error('Error cargando tareas:', error);
        setLoading(false);
      }
    };
    loadTasks();
  }, []); // ← Dependencies vacías porque se ejecuta solo al montar

  // Agregar nueva tarea
  const addTask = async () => {
    if (input.trim()) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: input.trim(), completed: false }),
        });
        const newTask = await response.json();
        setTasks([newTask, ...tasks]);
        setInput('');
      } catch (error) {
        console.error('Error agregando tarea:', error);
      }
    }
  };

  // Toggle completar tarea
  const toggleTask = async (task) => {
    try {
      const response = await fetch(`${API_URL}/${task._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !task.completed }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(t => (t._id === task._id ? updatedTask : t)));
    } catch (error) {
      console.error('Error actualizando tarea:', error);
    }
  };

  // Eliminar tarea
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error eliminando tarea:', error);
    }
  };

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Contadores
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const activeTasks = totalTasks - completedTasks;

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') addTask();
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="header-content"
        >
          <FiList className="header-icon" />
          <h1>TaskFlow Manager</h1>
          <p>Gestioná tus tareas de forma simple y eficiente</p>
        </motion.div>
      </header>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="stats"
      >
        <div className="stat-card">
          <FiList className="stat-icon" />
          <span className="stat-number">{totalTasks}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-card">
          <FiClock className="stat-icon" />
          <span className="stat-number">{activeTasks}</span>
          <span className="stat-label">Pendientes</span>
        </div>
        <div className="stat-card">
          <FiCheck className="stat-icon" />
          <span className="stat-number">{completedTasks}</span>
          <span className="stat-label">Completadas</span>
        </div>
      </motion.div>

      {/* Input Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="input-section"
      >
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="¿Qué tenés que hacer hoy?"
            className="task-input"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={addTask}
            className="add-button"
          >
            <FiPlus />
          </motion.button>
        </div>
      </motion.div>

      {/* Filter Buttons */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="filter-section"
      >
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
          >
            {f === 'all' ? 'Todas' : f === 'active' ? 'Pendientes' : 'Completadas'}
          </button>
        ))}
      </motion.div>

      {/* Task List */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="task-list"
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="empty-state"
            >
              <p>Cargando tareas...</p>
            </motion.div>
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task, index) => (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
                transition={{ delay: index * 0.05 }}
                layout
                className={`task-item ${task.completed ? 'completed' : ''}`}
              >
                <button
                  onClick={() => toggleTask(task)}
                  className={`checkbox ${task.completed ? 'checked' : ''}`}
                >
                  {task.completed && <FiCheck className="check-icon" />}
                </button>
                
                <span className="task-text">{task.text}</span>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => deleteTask(task._id)}
                  className="delete-button"
                >
                  <FiTrash2 />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="empty-state"
            >
              <FiList className="empty-icon" />
              <p>
                {filter === 'all' 
                  ? 'No hay tareas aún. ¡Agregá una!' 
                  : `No hay tareas ${filter === 'active' ? 'pendientes' : 'completadas'}`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <footer className="footer">
        <p>Desarrollado por Brian Emanuel Ybalo</p>
        <p className="footer-tech">React • Express • MongoDB • Framer Motion</p>
      </footer>
    </div>
  );
}

export default App;