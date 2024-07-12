const exp = require("constants");
const express = require("express");
const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());


//prefijo de /
app.get("/", (req,res)=>{
    res.send("Hola desde express");
});

// /numerodelacategoria, traigo array por id categorias
const productosparams = require("./routes/productos.routes");
app.use("/",productosparams);

//meth post
// const insert = require("./routes/productos.routes");
// app.use("/",insert);








const port=3306;

app.listen(port,()=> console.log(`http ://localhost:${port}`));
