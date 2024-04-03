const express = require("express");
const router = express.Router();
const cartManager = require("../controllers/cartManager.js");
const carritoManager = new cartManager("./src/models/carts.json");
///////////// RUTAS /////////////////

// Ruta
router.get("/carts/:cid", async (request, response) => {
    const cartId = parseInt(request.params.cid)
    const carrito = await carritoManager.getCarritoById(cartId);
    response.json(carrito.productos);
})

// Ruta /carts
router.post("/carts", async (request, response) => {
    const nuevoCarrito = await carritoManager.crearCarrito();
    response.json(nuevoCarrito);
})

// Ruta 
router.post("/carts/:cid/product/:pid", async (request, response) => {
    const cartId = parseInt(request.params.cid);
    const prodId = request.params.pid;
    const quantity = request.body.quantity || 1;
    const actualizarCarrito = await carritoManager.agregarProdCarrito(cartId, prodId, quantity);
    response.json(actualizarCarrito.productos);
})
///////////////////////////
// Exportación
module.exports = router;

