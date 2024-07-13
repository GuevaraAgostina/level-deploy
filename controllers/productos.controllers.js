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

    // Asegúrate de que 'id' es un valor válido, y en caso contrario devuelve un error.
    if (!id) {
        return res.status(400).json({ error: "ID del producto es requerido" });
    }

    // Definir la consulta SQL
    const sql = 'SELECT * FROM productos WHERE id_productos = ?'; // Asegúrate de que el nombre de la columna sea correcto

    // Ejecutar la consulta SQL
    db.query(sql, [id], (error, rows) => {
        if (error) {
            console.error('Error en la consulta:', error);
            return res.status(500).json({ error: 'Intente más tarde' });
        }

        // Verificar si se encontraron resultados
        if (rows.length === 0) {
            return res.status(404).json({ error: "No existe el producto" });
        }

        // Devolver los resultados encontrados
        res.json(rows[0]); // Suponiendo que id_productos es único, devolver el primer resultado
    });
};


// método POST para agregar productos
const store = (req, res) => {
    const { nombre, descripcion, precio, stock, id_categorias } = req.body;
    const sql =
      "INSERT INTO productos (nombre,descripcion, precio, stock, id_categorias) VALUES (?,?,?,?,?)";
  
    db.query(
      sql,
      [nombre, descripcion, precio, stock, id_categorias],
      (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Intente más tarde" });
        }
  
        const producto = { ...req.body, id: result.insertId };
        res.json(producto);
      }
    );
};

// método PUT para actualizar productos
const update = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, id_categorias } = req.body;
    const sql =
      "UPDATE productos SET nombre = ?, descripcion=?, precio = ?, stock = ?, id_categorias = ? WHERE id_productos = ?";
  
    db.query(sql, [nombre, descripcion, precio, stock, id_categorias, id], (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Intente más tarde" });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No existe el producto" });
      }
  
      const producto = { ...req.body, id: id };
      res.json(producto);
    });
};

// método DELETE para eliminar productos
const destroy = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM productos WHERE id_productos = ?";

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
