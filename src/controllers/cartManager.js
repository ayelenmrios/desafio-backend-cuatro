const fs = require("fs").promises;

class cartManager {
    constructor(archivo){
        //
        this.carts = [];
        this.path = archivo;
        this.lastId = 0;
        this.cargarCarritos();
    }
    //////////////////////////
    async cargarCarritos(){
        try{
            const data =  await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if(this.carts.length > 0){
                this.lastId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch(error){
            console.log("No se crearon los carritos", error);
            await this.guardarCarritos();
        }
    }

    async guardarCarritos(){
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    ////
    async agregarProdCarrito(carroId, prodId, cant = 1){
        const carrito = await this.getCarritoById(carroId);
        const prodExistente = carrito.products.find(p => p.product === prodId);

        if(prodExistente){
            prodExistente.quantity += quantity;
        } else{
            carrito.products.push({proeduct: prodId, quantity});
        }
        // 
        await this.guardarCarritos();
        return carrito;

    }

    async crearCarrito(){
        // Array
        const nuevoCarrito = {
            id: ++this.lastId, 
            productos: []
        }
        this.carts.push(nuevoCarrito);
        await this.guardarCarritos();
        return nuevoCarrito;
    }

    async getCarritoById(carritoId){
        const buscoCarrito = this.carts.find(c => c.id === carritoId);
        if(!buscoCarrito){
            console.log("No existe carrito.");
        } else{
            return buscoCarrito;
        }

    }

}

// Exportación de la clase
module.exports = cartManager;
