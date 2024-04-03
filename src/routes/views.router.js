const express = require("express");
const router = express.Router();

const ProductManager = require("../controllers/productManager.js");
const manager = new ProductManager("./src/models/productos.json");

router.get("/realtimeproducts",  (request, response) => {
    response.render("realtimeproducts");
})

router.get("/", async (request, response) => {
    try {
        const misProductos = await manager.getProducts();
        response.render("inicio", {misProductos:misProductos});
    } catch(error){
        response.status(500).json({ error: "Tenemos problemas con el servidor"});
    }
})
////////////
module.exports = router;