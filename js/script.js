/* ======================================================= 
   1. Declaración de Constantes y Variables Globales
   ======================================================= */ 

const contenedorProductos = document.getElementById("contenedor-productos");
const listaCarrito = document.getElementById('lista-carrito');
const botonVaciar = document.getElementById('vaciar-carrito');
const formularioContacto = document.getElementById('form-contacto');

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

/* ======================================================= 
   2. Llamada a la API de Productos
   ======================================================= */    
async function obtenerProductos() {
    try {
        const respuesta = await fetch('https://fakestoreapi.com/products?limit=6'); 
        const productos = await respuesta.json();
        
        mostrarProductos(productos);

        window.productosAPI = productos; 
        mostrarCarrito();
        
    } catch (error) {
        console.error('Hubo un error al traer los productos:', error);
    }
}

/* ======================================================= 
   3. Renderizar productos en la tienda
   ======================================================= */ 
function mostrarProductos(listaProductos) {
    contenedorProductos.innerHTML = '';

    listaProductos.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('tarjeta-producto'); 
        
        div.innerHTML = `
            <img src="${producto.image}" alt="${producto.title}">
            <h3>${producto.title}</h3>
            <p class="precio">$${producto.price}</p>
            <button class="boton" data-id="${producto.id}">Agregar al Carrito</button>
        `;

        contenedorProductos.appendChild(div);
    });
}

/* ======================================================= 
   4. Delegación de eventos para Agregar Productos
   ======================================================= */ 
contenedorProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('boton')) {
        const idProducto = parseInt(e.target.dataset.id);
        agregarAlCarrito(idProducto);
    }
});

/* ======================================================= 
   5. Agregar un producto al carrito
   ======================================================= */ 
function agregarAlCarrito(idProducto) {
    const productoExistente = carrito.find(item => item.id === idProducto);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({
            id: idProducto,
            cantidad: 1
        });
    }
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    mostrarCarrito();
}

/* ======================================================= 
   6. Contador Dinámico del Carrito
   ======================================================= */ 
// 
function actualizarContadorCarrito() {
    const contador = document.getElementById('contador-carrito');
    if (!contador) return;
    
    const totalProductos = carrito.reduce((acumulador, item) => acumulador + item.cantidad, 0);
    contador.innerText = totalProductos;
}

/* ======================================================= 
   7. Dibujar detalle del carrito
   ======================================================= */ 
function mostrarCarrito() {
    if (!window.productosAPI || !listaCarrito) return;

    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<p style="text-align: center; color: var(--gris);">El carrito está vacío.</p>`;
        return;
    }

    let totalGeneral = 0;

    carrito.forEach(item => {
        const datosProducto = window.productosAPI.find(p => p.id === item.id);

        if (datosProducto) {
            const subtotal = datosProducto.price * item.cantidad;
            totalGeneral += subtotal;

            const divItem = document.createElement('div');
            divItem.style.display = 'flex';
            divItem.style.justify = 'space-between';
            divItem.style.alignItems = 'center';
            divItem.style.padding = '1rem 0';
            divItem.style.borderBottom = '1px solid var(--grisClaro)';

            // Agregado de un botón [X] rojo chico para eliminar el producto individualmente
            divItem.innerHTML = `
                <p style="margin: 0; text-align: left; max-width: 60%;"><strong>${datosProducto.title}</strong> (x${item.cantidad})</p>
                <div style="display: flex; gap: 1.5rem; align-items: center;">
                    <p style="margin: 0; color: var(--primario); font-weight: bold;">$${subtotal.toFixed(2)}</p>
                    <button class="btn-eliminar" data-id="${item.id}" style="background: #dc3545; color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 0.3rem; cursor: pointer;">X</button>
                </div>
            `;
            listaCarrito.appendChild(divItem);
        }
    });

    const divTotal = document.createElement('div');
    divTotal.style.display = 'flex';
    divTotal.style.justify = 'space-between';
    divTotal.style.alignItems = 'center';
    divTotal.style.padding = '1.5rem 0';
    divTotal.style.marginTop = '1rem';
    divTotal.style.borderTop = '2px solid var(--primario)';

    divTotal.innerHTML = `
        <h3 style="margin: 0; text-transform: uppercase; letter-spacing: 1px;">Total de la Compra:</h3>
        <h2 style="margin: 0; color: var(--primario); font-size: 3rem;">$${totalGeneral.toFixed(2)}</h2>
    `;
    listaCarrito.appendChild(divTotal);
}

/* ======================================================= 
   8. Escuchar clics para Restar o Eliminar un producto del carrito
   ======================================================= */ 
listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
        const idProducto = parseInt(e.target.dataset.id);
        
        // Buscamos el producto en nuestro carrito
        const productoEnCarrito = carrito.find(item => item.id === idProducto);
        
        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad > 1) {
                // Si hay más de uno, solo restamos una unidad
                productoEnCarrito.cantidad--;
            } else {
                // Si queda solo uno, lo eliminamos por completo del array
                carrito = carrito.filter(item => item.id !== idProducto);
            }
        }
        
        // Guardamos y actualizamos todo
        localStorage.setItem('carrito', JSON.stringify(carrito));
        actualizarContadorCarrito();
        mostrarCarrito();
    }
});

/* ======================================================= 
   9. Vaciar Carrito por Completo
   ======================================================= */  
if (botonVaciar) {
    botonVaciar.addEventListener('click', () => {
        carrito = []; 
        localStorage.removeItem('carrito'); 
        actualizarContadorCarrito(); 
        mostrarCarrito(); 
    });
}

/* ======================================================= 
   10. Validación de Formulario por JS 
   ======================================================= */ 
if (formularioContacto) {
    formularioContacto.addEventListener('submit', function(e) {
        // Buscamos los inputs dentro del formulario
        const nombre = formularioContacto.querySelector('input[name="nombre"]').value.trim();
        const email = formularioContacto.querySelector('input[name="email"]').value.trim();
        const mensaje = formularioContacto.querySelector('textarea[name="mensaje"]').value.trim();
        
        // Expresión regular para validar formato de e-mail correcto
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre === "" || email === "" || mensaje === "") {
            e.preventDefault(); // Frenamos el envío
            alert("Por favor, completa todos los campos requeridos.");
            return;
        }

        if (!regexEmail.test(email)) {
            e.preventDefault(); // Frenamos el envío
            alert("Por favor, ingresa un formato de correo electrónico válido.");
            return;
        }
        
        // Si pasa las validaciones, se envía normalmente a Formspree
    });
}

/* ======================================================= 
   11. Ejecuciones Iniciales
   ======================================================= */ 
obtenerProductos();
actualizarContadorCarrito();