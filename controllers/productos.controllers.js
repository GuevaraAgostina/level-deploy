const db= require("../db/db");//traigo la conexion de la base de datos
//traigo productos
const index = (req,res) => {
    const sql = "SELECT * FROM productos";

    db.query(sql, (error, rows) => {

        if(error){
            res.status(500).json({error: 'Intente mas tarde'});
        }

        res.json(rows);
                     
    });
};
//traigo productos con la categoria
const show = (req,res) => {

    const {id} = req.params;
    const sql = 'SELECT * FROM productos WHERE id_categorias = ?';// hacemos consulta en la base de datos
    db.query(sql,[id], (error , rows) => {//pasamos el parametro que guaramos en id
        if(error){
            return res.status(500).json({error: 'Intente mas tarde'});
        }

        if(rows.length == 0 ){
            return res.status(404).json({error: "NO EXISTE EL PRODuCTO "});
        }        

        res.json(rows);
    }); 
};

const store = (req, res) => {
    const {nombre,precio,stock} = req.body;

    const sql = "INSERT INTO productos (nombre, precio, stock) VALUES (?,?,?)" ;

    db.query(sql, [nombre, precio, stock ], (error, result ) => {
        if(error){
            return res.status(500).json({error: 'Intente mas tarde'});
        }

        const producto = {...req.body, id: result.insertId};

        res.json(producto);
    });

};


module.exports= {
    index,
    show,
    store
};