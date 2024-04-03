const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api", productsRouter);
app.use("/api", cartRouter);
app.use("/", viewsRouter);

const exphbs = require("express-handlebars");
const socket = require("socket.io");
const io = socket(httpServer);

const ProductManager = require("./controllers/productManager.js");
const manager = new ProductManager("./src/models/productos.json");
////////////////////////// REVISAR !!!

io.on("conecction", async (socket) => {

    console.log("Se acaba de conectar un cliente!");

    socket.emit("productos", await manager.getProducts());

    //Evento eliminar
    socket.on("eliminar", async (id) => {
        await manager.deleteProduct(id);
        socket.emit("productos", await manager.getProducts());
    })

    //Evento agregar
    socket.on("agregar", async (producto) => {
        await manager.addProduct(producto);
        socket.emit("productos", await manager.getProducts());
    })
})

/////////////////////////
const httpServer = app.listen(PUERTO, () => {
    console.log(`Probando puerto: ${PUERTO}`);
})