import { productos } from './products.js'
import { guardarCarrito, obtenerCarrito} from "./storage.js";

const shopContent = document.getElementById('shopContent');
const verCarrito = document.getElementById('verCarrito');
const modalContainer = document.getElementById('modal-container');
const cantidadCarrito = document.getElementById('cantidadCarrito');

const variedadesEnElMundo = 'https://api.sampleapis.com/coffee/hot';
fetch(variedadesEnElMundo)
  .then(resp => resp.json())
  .then(data => displayData(data));

function displayData(data) {
  console.log(data);
};


const carritoCounter = () => {
    cantidadCarrito.style.display = 'block';
    cantidadCarrito.innerText = carrito.length;
};

let carrito = obtenerCarrito() || [];

carritoCounter();

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
            console.log(carrito);
            console.log(carrito.length);
            guardarCarrito(carrito);
            carritoCounter();
        };

        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'Se ha agregado un producto al carrito!'
          });
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
            <span class="restar"> ➖ </span>
            <p>Cantidad: ${product.cantidad}</p>
            <span class="sumar"> ➕ </span>
            <p>Total: $${product.cantidad * product.precio}</p>
        `;

        modalContainer.append(carritoContent);
        
        let restar = carritoContent.querySelector('.restar');
        restar.addEventListener('click', () => {
            if(product.cantidad !== 1){
                product.cantidad--;
            }
            guardarCarrito();
            pintarCarrito();
        });

        let sumar = carritoContent.querySelector('.sumar');
        sumar.addEventListener('click', () => {
            product.cantidad++;
            guardarCarrito();
            pintarCarrito();
        });

        let eliminar = document.createElement('span');
        eliminar.innerText = '❌';
        eliminar.className = 'delete-product';
        carritoContent.append(eliminar);

        eliminar.addEventListener('click', () => {
            eliminarProducto();
            const toastDos = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              toastDos.fire({
                icon: 'error',
                title: 'Se ha eliminado un producto del carrito!'
              })
        })
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalBuying = document.createElement('div');
    totalBuying.className = "total-content";
    totalBuying.innerHTML = `Total a pagar: $${total}`;
    
    modalContainer.append(totalBuying);
}

verCarrito.addEventListener('click', pintarCarrito);

const eliminarProducto = () => {
    const foundId = carrito.find((element) => element.id)

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });
    carritoCounter();
    pintarCarrito();
    guardarCarrito(carrito);
};

export { carrito }