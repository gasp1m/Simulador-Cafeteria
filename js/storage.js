import { carritoCounter } from './index.js';

const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const obtenerCarrito = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    return carritoStorage;
    carritoCounter();
};

export { guardarCarrito, obtenerCarrito };