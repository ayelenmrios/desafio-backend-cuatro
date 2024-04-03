const socket = io();

socket.on("productos", (data) => {
    rednerProductos(data);
})
///////////
const renderProductos = (productos) => {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";

    productos.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `
            <p> ID: ${item.id} </p>
            <p> Titulo:  ${item.title} </p>
            <p> Precio: ${item.price} </p>
            <button> Borrar producto </button>`;
        contenedor.appendChild(card);
        card.querySelector("button").addEventListener("click", () => {
            eliminar(item.id)
        }) 
    })
}

const eliminar = (id) => {
    socket.emit("eliminar", id);
}

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregar();
})

const agregar = () => {
    const producto = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    socket.emit("agregar", producto);
}