# TaskFlow Manager - Full-Stack MERN Application

Aplicación de gestión de tareas desarrollada con el stack MERN (MongoDB, Express, React, Node.js).

## 🚀 Demo en Vivo

- **Frontend:** [https://taskflow-manager-brian.vercel.app](https://taskflow-manager-brian.vercel.app)
- **Backend API:** [https://taskflow-api-brian.onrender.com](https://taskflow-api-brian.onrender.com)

## 🛠️ Tecnologías

### Frontend (`client/`)
| Tecnología | Propósito |
|-----------|-----------|
| React 18 | Biblioteca de UI |
| Vite | Build tool y dev server |
| Framer Motion | Animaciones fluidas |
| React Icons | Íconos SVG |
| CSS Modules | Estilos modulares |

### Backend (`server/`)
| Tecnología | Propósito |
|-----------|-----------|
| Node.js | Runtime de JavaScript |
| Express.js | Framework de servidor |
| MongoDB Atlas | Base de datos en la nube |
| Mongoose | ODM para MongoDB |
| CORS | Middleware para conexiones cruzadas |
| dotenv | Variables de entorno |

## ✨ Features

### Funcionalidades del Usuario
- ✅ Agregar tareas nuevas con validación
- ✅ Marcar tareas como completadas/pendientes
- ✅ Eliminar tareas con animación de salida
- ✅ Filtrar tareas: Todas / Pendientes / Completadas
- ✅ Contadores en tiempo real (Total, Pendientes, Completadas)
- ✅ Persistencia en MongoDB (los datos no se pierden al recargar)
- ✅ Animaciones fluidas con Framer Motion
- ✅ Diseño responsive (móvil, tablet, desktop)
- ✅ Loading states y manejo de errores

### Características Técnicas
- ✅ Arquitectura cliente-servidor separada
- ✅ API RESTful con endpoints CRUD completos
- ✅ Conexión segura a MongoDB Atlas
- ✅ Variables de entorno para configuración
- ✅ CORS configurado para múltiples orígenes
- ✅ Código modular y escalable

## 📁 Estructura del Proyecto
mini-app-mern/
├── client/ # Frontend (React + Vite)
│ ├── public/
│ ├── src/
│ │ ├── App.jsx # Componente principal
│ │ ├── App.css # Estilos
│ │ ├── main.jsx # Entry point
│ │ └── index.css # Estilos globales
│ ├── package.json
│ └── vite.config.js
│
├── server/ # Backend (Express + MongoDB)
│ ├── config/
│ │ └── db.js # Conexión a MongoDB
│ ├── models/
│ │ └── Task.js # Modelo de tarea (Mongoose)
│ ├── routes/
│ │ └── tasks.js # Rutas de la API REST
│ ├── .env # Variables de entorno
│ ├── index.js # Entry point del servidor
│ └── package.json
│
├── .gitignore
└── README.md

## 📦 Instalación y Ejecución Local

### Prerrequisitos
- Node.js 18+ instalado
- MongoDB Atlas account (gratis)
- Git instalado

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/mini-app-mern.git
cd mini-app-mern

### paso 2: Configurar el Backend

# Entrar a la carpeta del server
cd server

# Instalar dependencias
npm install

# Crear archivo .env con tus variables
cp .env.example .env  # O crear manualmente:

# Contenido de .env:
PORT=5000
MONGODB_URI=mongodb+srv://tu-usuario:tu-password@cluster.mongodb.net/taskflow?retryWrites=true&w=majority

# Iniciar el servidor en modo desarrollo
npm run dev


### Paso 3: Configurar el Frontend


# En otra terminal, entrar a la carpeta del client
cd ../client

# Instalar dependencias
npm install

# (Opcional) Crear .env.local para desarrollo
echo "VITE_API_URL=http://localhost:5000/api/tasks" > .env.local

# Iniciar el servidor de desarrollo
npm run dev

#### Paso 4: Abrir en el navegador

Frontend: http://localhost:5173
Backend API: http://localhost:5000