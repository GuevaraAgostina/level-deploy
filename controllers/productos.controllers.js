const db= require("../db/db");//traigo la conexion de la base de datos

const index = (req,res) => {
    const sql = "SELECT * FROM productos";

    db.query(sql, (error, rows) => {

        if(error){
            res.status(500).json({error: 'Intente mas tarde'});
        }

        res.json(rows);
                     
    });
};

module.exports= {
    index,
};