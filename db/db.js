const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'mysql-agostina.alwaysdata.net',
    user: 'agostina',
    password: 'Rubenteamo99',
    database: 'agostina_level'
});

connection.connect((error) => {
    if(error)
    {
        return console.error('error al conectar ',error);
    }

    console.log("conectado");
});

module.exports=connection;