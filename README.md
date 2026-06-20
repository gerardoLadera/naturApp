#  NaturApp - E-commerce de Productos Naturales

NaturApp es una aplicación móvil de comercio electrónico enfocada en la venta de productos naturales, inspirada en plataformas como Santa Natura. 

Este proyecto fue desarrollado aplicando tres pilares fundamentales para la construcción de software móvil: arquitectura modular, backend con endpoints RESTful y consumo dinámico de APIs desde el cliente.

##  Arquitectura del Proyecto

NaturApp sigue una arquitectura modular de dos capas, separando claramente las responsabilidades del servidor y la interfaz de usuario. Cada capa está organizada en módulos independientes.

### Backend (Node.js + Express)
* **Base de Datos:** MongoDB manipulado a través de modelos de Mongoose (User, Product, Category, Order).
* **API RESTful:** Endpoints modulares para operaciones CRUD de productos, carrito de compras y gestión de pedidos.
* **Seguridad:** Middleware de autenticación transversal que utiliza JSON Web Tokens (JWT) y encriptación de contraseñas con `bcryptjs`.

### Frontend (React Native + Expo Router)
* **Navegación:** Implementación de *file-based routing* utilizando Expo Router, con un layout raíz y un Tab Navigator (Inicio, Buscar, Carrito, Pedidos, Perfil).
* **Lógica de Negocio:** Encapsulada en Custom Hooks (`useProducts`, `useCart`, `useAuth`, `useOrders`) que actúan como intermediarios entre las vistas y el servicio API.
* **Performance:** Integración de estados de carga (`ActivityIndicator`), paginación en listas (`FlatList`), solicitudes HTTP en paralelo (`Promise.all`) y función *pull-to-refresh*.

---

## 🚀 Guía de Instalación y Ejecución

Sigue estos pasos para clonar y ejecutar el proyecto localmente. 

### 1. Requisitos Previos
* [Node.js](https://nodejs.org/) instalado en tu computadora.
* [MongoDB](https://www.mongodb.com/try/download/community) instalado y ejecutándose en local (puerto `27017`), o un clúster en MongoDB Atlas.
* Emulador de Android Studio o la app **Expo Go** en tu dispositivo físico.

### 2. Clonar el repositorio
```bash
git clone [https://github.com/gerardoLadera/naturApp.git](https://github.com/gerardoLadera/naturApp.git)
cd naturApp
```

### 3.Configurar y Levantar el Backend

# Navegar a la carpeta del backend
```bash
cd naturapp-backend
```

# Instalar dependencias
```bash
npm install
```

# Poblar la base de datos con categorías y productos de prueba (Script Semilla)
```bash
node seed.js
```

# Iniciar el servidor en el puerto 9090
```bash
npm run dev
# o usar: node server.js
```
### 4.Configurar y Levantar el Frontend
Abre una nueva terminal y navega a la carpeta del proyecto móvil.

# Navegar a la carpeta del frontend
```bash
cd naturapp-mobile
```
# Instalar dependencias solucionando conflictos de versiones de Expo
```bash
npm install --legacy-peer-deps
```

Importante: Antes de iniciar, ve a src/services/apiService.js y asegúrate de que la BASE_URL apunte a la IP correcta de tu servidor.
* Si usas el Emulador de Android, cambia la URL a: http://10.0.2.2:9090/api
* Si usas tu celular físico con Expo Go, cambia la URL a la IPv4 de tu computadora en la red local (ej: http://192.168.1.X:9090/api).

# Iniciar Expo forzando la limpieza de caché
```bash
npx expo start -c
```

Presiona la letra a en la terminal para abrir la app en el emulador de Android, o escanea el código QR con la app de Expo Go.


## Estructura Principal

El proyecto aplica principios de modularidad en sus carpetas:

```
naturapp-mobile/
 ├── app/               # Pantallas y Navegación (Expo Router)
 │   ├── (tabs)/        # Layout principal de pestañas inferiores
 │   ├── auth/          # Pantallas de Login y Registro
 │   └── product/       # Rutas dinámicas de detalle de producto
 ├── src/
 │   ├── components/    # Componentes UI reutilizables (ProductCard, etc.)
 │   ├── hooks/         # Lógica de negocio encapsulada (useCart, etc.)
 │   └── services/      # Cliente HTTP genérico (apiService.js)
```
