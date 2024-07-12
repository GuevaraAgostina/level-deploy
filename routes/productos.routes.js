const express = require("express");
const router = express.Router();

const controller = require('../controllers/productos.controllers')

// prefijo /productos

router.get ("/",controller.index);

// prefijo /id
router.get("/:id",controller.show);

router.post("/", controller.store);

module.exports=router;