# PRACTICA-PROYECTO

Aplicación con frontend en **React (Vite)** y backend en **Node.js con Express**.

---

## INSTRUCCIONES

### ¿Cómo usar?

---

### 🔹 FRONTEND

```bash
cd frontend
npm install
npm run dev
```

- Se abrirá automáticamente en: `http://localhost:5173`

---

### 🔹 BACKEND (Puerto 3000)

```bash
cd backend
npm install
nodemon index.js
```

- API activa en: `http://localhost:3000`

---

### 🔸 ESTRUCTURA DE CARPETAS

```
PRACTICA-PROYECTO/
│
├── frontend/       # React + Vite
│   ├── src/
│   ├── index.html
│   └── ...
│
├── backend/        # Node.js + Express
│   ├── index.js
│   └── ...
│
├── .gitignore
├── README.md
```

---

### 🔸 Requisitos

- Node.js
- npm
- nodemon (`npm install -g nodemon` si lo quieres global)

---

### 🔸 Notas de desarrollo

- Usa `CORS` en el backend para permitir llamadas desde el frontend.
- Puedes usar `axios` o `fetch` en React para consumir tus rutas del backend.
- Si decides hacer **build** del frontend (`npm run build`), puedes servir los archivos estáticos desde Express en producción.

---

### 🔸 Variables de entorno (opcional)

Puedes usar archivos `.env` para configurar:

#### En `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

#### En `backend/.env`:

```env
PORT=3000
```

---

### 🧪 Comandos útiles

```bash
# Iniciar frontend
npm run dev

# Iniciar backend
nodemon index.js
```

---

### ✨ Autor

Hecho con 💻 por [Piero Nicolini]
