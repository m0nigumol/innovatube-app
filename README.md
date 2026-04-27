# InnovaTube

> **Links del Proyecto:**
> - 🌐 **Demo en Vivo:** [https://tu-frontend.onrender.com](https://innovatube-app.onrender.com)
> - ⚙️ **API Endpoint:** [https://tu-backend.onrender.com](https://innovatube-backend-zegg.onrender.com)

InnovaTube es una aplicación web full-stack diseñada para explorar y gestionar videos de YouTube en una interfaz moderna y personalizada. Este proyecto fue desarrollado como parte de una prueba técnica, integrando soluciones de terceros y mejores prácticas de seguridad.

## Características Principales

- **Autenticación Completa:**
  - Registro de usuarios con validación de **Google reCAPTCHA v2**.
  - Inicio de sesión seguro mediante **JSON Web Tokens (JWT)**.
  - Recuperación de contraseña con encriptación en tiempo real.
- **Exploración de Contenido:**
  - Integración con **YouTube Data API v3**.
  - Listado de videos populares (Recomendaciones) al inicio.
  - Buscador global con estilos dinámicos inspirados en la interfaz oficial de YouTube.
- **Gestión de Favoritos:**
  - Sección dedicada para guardar y organizar videos preferidos.
  - Filtro de búsqueda local dentro de la biblioteca de favoritos.
- **Experiencia de Usuario (UX/UI):**
  - **YouTube Dark Mode:** Interfaz diseñada con Material UI siguiendo la estética oscura oficial.
  - **Diseño Responsivo:** Adaptable a dispositivos móviles, tablets y escritorio.
  - **Micro-interacciones:** Animaciones de hover, efectos de "glow" y transiciones suaves en botones de acción.

## Stack Tecnológico

### Frontend
- **React (TypeScript):** Biblioteca principal para la interfaz.
- **Material UI (MUI):** Sistema de componentes y tematización avanzada.
- **React Router Dom:** Gestión de rutas protegidas y navegación.
- **Axios:** Cliente HTTP para comunicación con la API.

### Backend
- **Node.js & Express:** Entorno de ejecución y framework de servidor.
- **MongoDB & Mongoose:** Base de datos NoSQL para persistencia de usuarios y favoritos.
- **Bcrypt.js:** Encriptación de contraseñas mediante hashing (10 rounds).
- **JWT:** Manejo de sesiones seguras.

## Instalación y Configuración

### Prerrequisitos
- Node.js (v16 o superior)
- Instancia de MongoDB (Local o Atlas).
- Cuenta en Google Cloud Console (para YouTube API y reCAPTCHA).

### Backend
1. Navega a la carpeta del servidor: `cd server`
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` y configura las siguientes variables:
   ```env
   PORT=4000
   MONGO_URI=tu_conexion_mongodb
   JWT_SECRET=tu_secreto_para_tokens
   YOUTUBE_API_KEY=tu_google_api_key
   RECAPTCHA_SECRET_KEY=tu_recaptcha_secret
   ```
4. Inicia el servidor: `npm start`

### Frontend
1. Navega a la carpeta del frontend: `cd client`
2. Instala las dependencias: `npm install`
3. Crea un archivo `.env` y configura las siguientes variables:
   ```env
   VITE_API_URL=tu_url_del_backend
   VITE_RECAPTCHA_SITE_KEY=tu_recaptcha_site
   ```
4. Inicia el servidor de desarrollo: `npm run dev`
5. Construir para producción: `npm run build`

## Seguridad Implementada
- **Protección de Rutas**: Middleware en el frontend que verifica la existencia de tokens válidos antes de permitir el acceso al /home.

- **Sanitización**: Los datos sensibles del usuario (passwords) nunca se devuelven en las consultas de la API.

- **Encriptación**: Los passwords se encriptan antes de ser guardados en la base de datos.

- **CORS**: Configurado para permitir peticiones únicamente desde el origen del frontend.

- **Validación Humana**: Implementación de reCAPTCHA para prevenir registros automatizados (bots).

## Arquitectura de Componentes
El proyecto sigue una estructura modular para facilitar la escalabilidad:

- `NavBar`: Gestión de navegación y logout.

- `SearchBar`: Componente inteligente para búsquedas en API y filtrado local.

- `VideoCard`: Componente reutilizable con lógica interna de favoritos y redirección externa.

## Autor
- **Mónica Guzmán Molina** - *Software Developer*
- 🔗 [LinkedIn](www.linkedin.com/in/m0nigumol)
- 🐙 [GitHub](https://github.com/m0nigumol)
