const express = require("express");
const app = express();
const path = require("path");

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Middleware para parsear JSON
app.use(express.json());


// Ruta base
app.get("/", (req,res)=>{
    res.send("Hola desde express");
});

// array de productos por id_categoria
const productosparams = require("./routes/productos.routes");
app.use("/productos",productosparams);

// const putt= require("./routes/productos.routes");
// app.use("/productos/:id",putt );

// Puerto de escucha
const port=3306;
app.listen(port,()=> console.log(`http ://localhost:${port}`));
