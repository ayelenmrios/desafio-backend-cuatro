const express = require("express");
const app = express();
const PUERTO = 8080;
const productsRouter = require("./routes/products.router");
const cartRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

const exphbs = require("express-handlebars");
const socket = require("socket.io");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"));

app.engine("handlebars", exphbs.engine());

app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api", productsRouter);
app.use("/api", cartRouter);
app.use("/", viewsRouter);
////////////////////////////////////////

