const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const obtenerCarrito = () => {
    JSON.parse(localStorage.getItem('carrito'));
};

export { guardarCarrito, obtenerCarrito };