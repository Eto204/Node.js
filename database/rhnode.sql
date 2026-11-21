-- ============================================================
--  Base de datos: rhnode
--  Proyecto final - Taller Especializado de Node.js
--  Ejecutar en phpMyAdmin (XAMPP) > pestaña SQL
-- ============================================================

CREATE DATABASE IF NOT EXISTS `rhnode` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `rhnode`;

-- Administradores del sistema (solo se dan de alta aquí, en la base de datos)
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_mail` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Empleados de la empresa
CREATE TABLE IF NOT EXISTS `empleados` (
  `emp_id` int(11) NOT NULL AUTO_INCREMENT,
  `emp_nombre` varchar(100) NOT NULL,
  `emp_apellidos` varchar(100) NOT NULL,
  `emp_telefono` varchar(20) NOT NULL,
  `emp_correo` varchar(100) NOT NULL,
  `emp_direccion` varchar(255) NOT NULL,
  PRIMARY KEY (`emp_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Administrador de prueba
INSERT INTO `user` (`user_name`, `user_mail`, `user_password`) VALUES
  ('Administrador', 'admin@tallernode.mx', 'Admin123');

-- Empleados de ejemplo
INSERT INTO `empleados` (`emp_nombre`, `emp_apellidos`, `emp_telefono`, `emp_correo`, `emp_direccion`) VALUES
  ('María', 'González López', '442 123 4567', 'maria.gonzalez@tallernode.mx', 'Av. Universidad 100, Centro, Querétaro'),
  ('Juan', 'Pérez Ramírez', '442 987 6543', 'juan.perez@tallernode.mx', 'Calle Hidalgo 25, Niños Héroes, Querétaro'),
  ('Ana', 'Martínez Ruiz', '442 555 1020', 'ana.martinez@tallernode.mx', 'Blvd. Bernardo Quintana 400, Arboledas, Querétaro');
