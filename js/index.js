import { productos } from './products.js';
import { guardarCarrito, obtenerCarrito } from "./storage.js";

const shopContent = document.getElementById('shopContent');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container');
const cantidadCarrito = document.getElementById('cantidadCarrito');

let carrito = obtenerCarrito() || [];

productos.forEach((product) => {
    let content = document.createElement('div');
    content.className = 'card';
    content.innerHTML = `
        <img src='${product.img}'>
        <h3>${product.nombre}</h3>
        <p class="price">$${product.precio}</p>
    `;

    shopContent.append(content);

    let comprar = document.createElement('button')
    comprar.innerText = `Comprar`;
    comprar.className = 'comprar';
    
    content.append(comprar);

    comprar.addEventListener('click', () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === product.id)
        
        if (repeat){
            carrito.map((prod) => {
                if (prod.id === product.id){
                    prod.cantidad++;
                }
            });
        } else {
            carrito.push({
                id: product.id,
                img: product.img,
                nombre: product.nombre,
                precio: product.precio,
                cantidad: product.cantidad,
            });
        }
            guardarCarrito(carrito);
            carritoCounter();
    });
});

const pintarCarrito = () => {
    const modalHeader = document.createElement('div');
    modalContainer.innerHTML = '';
    modalContainer.style.display = 'flex';
    modalHeader.className = 'modal-header';
    modalHeader.innerHTML = `
        <h1 class="modal-header-title">Carrito</h3>
    `;
    modalContainer.append(modalHeader);

    const modalButton = document.createElement('h1');
    modalButton.innerText = 'x';
    modalButton.className = 'modal-header-button';

    modalButton.addEventListener('click', () => {
        modalContainer.style.display = 'none';
    });

    modalHeader.append(modalButton);

    carrito.forEach((product) => {
        let carritoContent = document.createElement('div');
        carritoContent.className = 'modal-content';
        carritoContent.innerHTML = `
            <img src="${product.img}">
            <h3>${product.nombre}</h3>
            <p>$${product.precio}</p>
            <p>Cantidad: ${product.cantidad}</p>
            <p>Total: $${product.cantidad * product.precio}</p>
        `;

        modalContainer.append(carritoContent);

        let eliminar = document.createElement('span');
        eliminar.innerText = '❌';
        eliminar.className = 'delete-product';
        carritoContent.append(eliminar);

        eliminar.addEventListener('click', eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement('div');
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: $${total}`;
    modalContainer.append(totalBuying);
}

verCarrito.addEventListener('click', pintarCarrito);

const eliminarProducto = () => {
    const foundIt = carrito.find((element) => element.id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundIt;
    });
    carritoCounter();
    pintarCarrito();
    guardarCarrito(carrito);
};

const carritoCounter = () => {
    cantidadCarrito.style.display = 'block';
    cantidadCarrito.innerText = carrito.length;
};

export { carrito, carritoCounter};