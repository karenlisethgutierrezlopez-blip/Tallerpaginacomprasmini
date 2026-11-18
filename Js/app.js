const productos = [
    {
        id: 1,
        nombre: "Peluche Hello Kitty",
        precio: 65000,
        categoria: "Niña",
        stock: 5
    },

     {
        id: 2,
        nombre: "Spiderman",
        precio: 60000,
        categoria: "Niño",
        stock: 8
    },

    {
        id: 3,
        nombre: "Conejo",
        precio: 75000,
        categoria: "Bebes",
        stock: 4
    },

    {
        id: 4,
        nombre: "Snoopy",
        precio: 70000,
        categoria: "Niña",
        stock: 3 
    },

        {
        id: 5,
        nombre: "Batman",
        precio: 100000,
        categoria: "Niño",
        stock: 6
    },

    {
        id: 6,
        nombre: "Gato",
        precio: 80000,
        categoria: "Bebes",
        stock: 7
    },

    {
        id: 7,
        nombre: "Pucca",
        precio: 85000,
        categoria: "Niña",
        stock: 5
    },

    {
        id: 8,
        nombre: "Dragon",
        precio: 150000,
        categoria: "Audio",
        stock: 2
    }
];

let carrito = [];

let categoriaSeleccionada = "Todas";

const contenedorProductos = document.getElementById("productos");
const contenedorFiltros = document.getElementById("filtros");
const cantidadProductos = document.getElementById("cantidad-productos");

const listaCarrito = document.getElementById("lista-carrito");
const botonVaciar = document.getElementById("vaciar-carrito");

const articulos = document.getElementById("articulos");
const subtotal = document.getElementById("subtotal");
const descuento = document.getElementById("descuento");
const total = document.getElementById("total");

function mostrarProductos (){

    contenedorProductos.innerHTML = "";

    let productosFiltrados = productos;

    if(categoriaSeleccionada !== "Todas"){
        productosFiltrados = productos.filter(producto =>
            producto.categoria === categoriaSeleccionada
        );
    }

    cantidadProductos.textContent =
    `Mostrar ${productosFiltrados.length} productos`;

    productosFiltrados.forEach(producto => {

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");

        tarjeta.innerHTML =
        `<h3>${producto.nombre}</h3>
        <p>${producto.categoria}</p>
        <p>Precio: $ ${producto.precio.toLocaleString("es-CO")}</p>
        <p>Disponibles: ${producto.stock}</p>
        ${producto.stock === 0 ? "<span>Agotado</span>" : ""}
        <button class="agregar" data-id="${producto.id}"
            ${producto.stock === 0 ? "disabled" : ""}>
            Agregar
        </button>
        `;

        contenedorProductos.appendChild(tarjeta);

        const botonAgregar = tarjeta.querySelector(".agregar");

        botonAgregar.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        });
    });
}

function agregarAlCarrito(id) {

    const producto = productos.find(producto => producto.id === id);

    if(producto.stock === 0) {
        return;
    }

    const productoCarrito = carrito.find(item => item.id === id);

    if (productoCarrito) {
        
        productoCarrito.cantidad++;

    }else {
    carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1
    });
}

producto.stock--;

mostrarProductos();
mostrarCarrito();
}

function mostrarCarrito() {

    listaCarrito.innerHTML = "";

    if(carrito.length === 0) {

        listaCarrito.textContent = "Tu carrito está vacío";
    } else {

        carrito.forEach (producto => {

            const elemento = document.createElement("div");

            elemento.classList.add("producto-carrito");

           elemento.innerHTML = `
           <h3>${producto.nombre}</h3>
           <p>Precio unitario: $ ${producto.precio.toLocaleString("es-CO")}</p>
           <button class="disminuir">-</button>
           <span>${producto.cantidad}</span>
           <button class="aumentar">+</button>
           <p>Subtotal: $ ${(producto.precio * producto.cantidad).toLocaleString("es-CO")}</p>
           <button class="eliminar">Eliminar</button>`;

            listaCarrito.appendChild(elemento);

            elemento.querySelector(".aumentar").addEventListener("click", () => {
                aumentarCantidad(producto.id);
});
            elemento.querySelector(".disminuir").addEventListener("click", () => {
                disminuirCantidad(producto.id);
});
            elemento.querySelector(".eliminar").addEventListener("click", () => {
                eliminarProducto(producto.id);
});
        });
    }
    actualizarResumen();
}

function aumentarCantidad(id) {
     const producto = productos.find(producto => producto.id === id);

    const productoCarrito = carrito.find(item => item.id === id);

    if (producto.stock > 0) {

        productoCarrito.cantidad++;

        producto.stock--;

        mostrarProductos();
        mostrarCarrito();
    }
}

function disminuirCantidad(id) {

    const productoCarrito = carrito.find(item => item.id === id);

    const producto = productos.find(item => item.id === id);

    productoCarrito.cantidad--;

    producto.stock++;

    if (productoCarrito.cantidad === 0) {

        carrito = carrito.filter(item => item.id !== id);

    }

    mostrarProductos();
    mostrarCarrito();
}

function eliminarProducto(id) {

    const productoCarrito = carrito.find(item => item.id === id);

    const producto = productos.find(item => item.id === id);

    producto.stock += productoCarrito.cantidad;

    carrito = carrito.filter(item => item.id !== id);

    mostrarProductos();
    mostrarCarrito();
}

function vaciarCarrito() {

    carrito.forEach(item => {

        const producto = productos.find(producto => producto.id === item.id);

        producto.stock += item.cantidad;

    });

    carrito = [];

    mostrarProductos();
    mostrarCarrito();
}

botonVaciar.addEventListener("click", vaciarCarrito);

function actualizarResumen() {

    
    const cantidadArticulos = carrito.reduce((acumulador, producto) => {
        return acumulador + producto.cantidad;
    }, 0);

  
    const valorSubtotal = carrito.reduce((acumulador, producto) => {
        return acumulador + (producto.precio * producto.cantidad);
    }, 0);

    let valorDescuento = 0;

    if (valorSubtotal >= 300000) {
        valorDescuento = valorSubtotal * 0.10;
    }

    const valorTotal = valorSubtotal - valorDescuento;

    articulos.textContent = cantidadArticulos;

    subtotal.textContent = `$ ${valorSubtotal.toLocaleString("es-CO")}`;

    descuento.textContent = `-$ ${valorDescuento.toLocaleString("es-CO")}`;

    total.textContent = `$ ${valorTotal.toLocaleString("es-CO")}`;
}

function mostrarFiltros() {

    contenedorFiltros.innerHTML = "";

    const categorias = ["Todas", ...new Set(
        productos.map(producto => producto.categoria)
    )];

    categorias.forEach(categoria => {

        const boton = document.createElement("button");

        boton.textContent = categoria;

        if (categoria === categoriaSeleccionada) {
            boton.classList.add("activo");
        }

        boton.addEventListener("click", () => {

            categoriaSeleccionada = categoria;

            mostrarFiltros();
            mostrarProductos();

        });

        contenedorFiltros.appendChild(boton);
    });
}

mostrarFiltros();
mostrarProductos();
mostrarCarrito();