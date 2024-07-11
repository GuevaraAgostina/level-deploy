const express = require("express");
const router = express.Router();

const controller = require('../controllers/productos.controllers')

// prefijo /productos

router.get ("/",controller.index);

module.exports=router;