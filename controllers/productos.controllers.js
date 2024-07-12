const db = require("../db/db"); // traigo la conexion de la base de datos

// traigo productos
const index = (req, res) => {
    const sql = "SELECT * FROM productos";

    db.query(sql, (error, rows) => {
        if (error) {
            res.status(500).json({ error: 'Intente más tarde' });
        }

        res.json(rows);
    });
};

// traigo productos con la categoria
const show = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM productos WHERE id_categorias = ?'; // hacemos consulta en la base de datos
    db.query(sql, [id], (error, rows) => { // pasamos el parametro que guardamos en id
        if (error) {
            return res.status(500).json({ error: 'Intente más tarde' });
        }

        if (rows.length == 0) {
            return res.status(404).json({ error: "No existe el producto" });
        }

        res.json(rows);
    });
};

// método POST para agregar productos
const store = (req, res) => {
    const { nombre, precio, stock, id_categorias } = req.body;
    const sql = "INSERT INTO productos (nombre, precio, stock, id_categorias) VALUES (?,?,?,?)";

    db.query(sql, [nombre, precio, stock, id_categorias], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Intente más tarde' });
        }

        const producto = { ...req.body, id: result.insertId };
        res.json(producto);
    });
};

// método PUT para actualizar productos
const update = (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock, id_categorias } = req.body;
    const sql = "UPDATE productos SET nombre = ?, precio = ?, stock = ?, id_categorias = ? WHERE id = ?";

    db.query(sql, [nombre, precio, stock, id_categorias, id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Intente más tarde' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No existe el producto" });
        }

        res.json({ message: "Producto actualizado correctamente" });
    });
};

// método DELETE para eliminar productos
const destroy = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM productos WHERE id = ?";

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Intente más tarde' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No existe el producto" });
        }

        res.json({ message: "Producto eliminado correctamente" });
    });
};

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
