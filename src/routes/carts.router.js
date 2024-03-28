const express = require("express");
const router = express.Router();
const cartManager = require("../controllers/cartManager.js");

// Instancia:
const carritoManager = new cartManager("./src/models/carts.json");
///////////// RUTAS /////////////////

// Ruta
router.get("/carts/:cid", async (request, response) => {
    const cartId = parseInt(request.params.cid);

    const carrito = await carritoManager.getCarritoById(cartId);
    response.json(carrito.products);
})

// Ruta /carts
router.post("/carts", async (request, response) => {
    const nuevoCarrito = await carritoManager.crearCarrito();
    response.json(nuevoCarrito);
})

///////////////////////////
// Exportación
module.exports = router;

