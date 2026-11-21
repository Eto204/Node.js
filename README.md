# RHnode — Sistema de administración de empleados
#Alejandro Estrada Montes de oca
#Naybi Ocampo Arriaga

Proyecto final del Taller Especializado de Node.js (Express + JWT + MySQL en XAMPP).

## Cómo correrlo

1. Enciende **Apache** y **MySQL** en XAMPP.
2. phpMyAdmin → pestaña **SQL** → pega y ejecuta `database/rhnode.sql`.
3. En la terminal, dentro de la carpeta:
   ```bash
   npm install
   npm start
   ```
4. Abre http://localhost:3000 — usuario `admin@tallernode.mx`, contraseña `Admin123`.

Para agregar otro administrador (solo desde la base de datos):
```sql
INSERT INTO user (user_name, user_mail, user_password) VALUES ('Nombre', 'correo@dominio.com', 'contraseña');
```

## Base de datos `rhnode`

**user**: `user_id`, `user_name`, `user_mail`, `user_password`

**empleados**: `emp_id`, `emp_nombre`, `emp_apellidos`, `emp_telefono`, `emp_correo`, `emp_direccion`

## Rutas de la API

| Método | Ruta | Token | Qué hace |
|---|---|---|---|
| POST | `/user/login` | No | Inicia sesión `{ user_mail, user_password }`, regresa el token en `message` |
| GET | `/empleados` | Sí | Todos los empleados |
| GET | `/empleados/:id` | Sí | Un empleado |
| GET | `/empleados/buscar/:nombre` | Sí | Busca por nombre o apellidos |
| POST | `/empleados` | Sí | Agrega `{ emp_nombre, emp_apellidos, emp_telefono, emp_correo, emp_direccion }` |
| PUT | `/empleados/:id` | Sí | Modifica (mismos campos) |
| DELETE | `/empleados/:id` | Sí | Elimina |

Token en el encabezado: `Authorization: Bearer <token>`

## Front (`front/`)

- `index.html` → login
- `empleados.html` → lista, búsqueda y eliminar
- `registrar.html` → agregar empleado
- `editar.html?id=1` → editar empleado
- `js/sesion.js` → código compartido (token, cerrar sesión, errores)
