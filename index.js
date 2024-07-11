const exp = require("constants");
const express = require("express");
const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

//prefijo /productos
const productosRouter= require("./routes/productos.routes");
app.use("/productos", productosRouter);

//prefijo de /
app.get("/", (req,res)=>{
    res.send("Hola desde express");
});





const port=3306;

app.listen(port,()=> console.log(`http ://localhost:${port}`));
