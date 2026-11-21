const express = require('express');
const empleados = express.Router();
const db = require('../config/database');

// Agregar empleado
empleados.post("/", async (req, res, next) => {
    const { emp_nombre, emp_apellidos, emp_telefono, emp_correo, emp_direccion } = req.body;

    if (emp_nombre && emp_apellidos && emp_telefono && emp_correo && emp_direccion) {
        let query = "INSERT INTO empleados (emp_nombre, emp_apellidos, emp_telefono, emp_correo, emp_direccion) ";
        query += `VALUES ('${emp_nombre}', '${emp_apellidos}', '${emp_telefono}', '${emp_correo}', '${emp_direccion}')`;

        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado agregado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Error al agregar el empleado" });
    }
    return res.status(400).json({ code: 400, message: "Campos incompletos" });
});

// Eliminar empleado
empleados.delete("/:id([0-9]+)", async (req, res, next) => {
    const query = `DELETE FROM empleados WHERE emp_id = ${req.params.id}`;

    const rows = await db.query(query);
    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado eliminado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

// Modificar empleado
empleados.put("/:id([0-9]+)", async (req, res, next) => {
    const { emp_nombre, emp_apellidos, emp_telefono, emp_correo, emp_direccion } = req.body;

    if (emp_nombre && emp_apellidos && emp_telefono && emp_correo && emp_direccion) {
        let query = `UPDATE empleados SET emp_nombre = '${emp_nombre}', emp_apellidos = '${emp_apellidos}', `;
        query += `emp_telefono = '${emp_telefono}', emp_correo = '${emp_correo}', emp_direccion = '${emp_direccion}' `;
        query += `WHERE emp_id = ${req.params.id}`;

        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
    }
    return res.status(400).json({ code: 400, message: "Campos incompletos" });
});

// Consultar todos los empleados
empleados.get("/", async (req, res, next) => {
    const rows = await db.query("SELECT * FROM empleados");
    return res.status(200).json({ code: 200, message: "Empleados encontrados", data: rows });
});

// Consultar un empleado por id
empleados.get("/:id([0-9]+)", async (req, res, next) => {
    const id = req.params.id;
    const rows = await db.query("SELECT * FROM empleados WHERE emp_id = " + id);
    if (rows.length > 0) {
        return res.status(200).json({ code: 200, message: "Empleado encontrado", data: rows });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

// Buscar empleados por nombre
empleados.get("/buscar/:nombre", async (req, res, next) => {
    const nombre = req.params.nombre;
    const query = `SELECT * FROM empleados WHERE emp_nombre LIKE '%${nombre}%' OR emp_apellidos LIKE '%${nombre}%'`;

    const rows = await db.query(query);
    if (rows.length > 0) {
        return res.status(200).json({ code: 200, message: "Empleados encontrados", data: rows });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

module.exports = empleados;
