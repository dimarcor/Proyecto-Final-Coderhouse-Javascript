$().ready ( () => { 
// VARIABLES
let seccionJuegos = document.getElementById('games');
// Guardar las secciones para generar el HTML
const seccionCarrito = document.getElementById('listCarrito');


// Guardar botones en variables

// Juegos
let ordenJuegoAZ = document.getElementById('a-z--game');
let ordenJuegoZA = document.getElementById('z-a--game');
let ordenJuegoMenorPrecio = document.getElementById('lowPrice--game');
let ordenJuegoMayorPrecio = document.getElementById('highPrice--game');

// CLASES

// Creamos clase para los videojuegos
class Producto {
    constructor(nombre, id, genero, precio, imagen) {
        this.nombre = nombre;
        this.id = id;
        this.genero = genero;
        this.precio = precio;
        this.imagen = imagen;
        this.vendido = false;
    }
}

class Carrito {
    constructor(nombre, id, genero, precio, imagen) {
        this.nombre = nombre;
        this.id = id;
        this.genero = genero;
        this.precio = precio;
        this.imagen = imagen;
        this.vendido = false;
    }
}



// Creamos la clase para el carrito


// ARRAYS

// Creamos el array de videojuegos
let juegos = [];

$.getJSON("./json/data.json", (data, respuesta) => {
    if(respuesta === 'success'){
        console.log(data);
        juegos = data;
        if (seccionJuegos!==null){
            for(const juego of juegos) {
                crearProducto(juego);
            }
        }
        let botonesCompra = document.getElementsByClassName('carritoBoton');
        for(const boton of botonesCompra) {
            boton.onclick = añadirCarrito;
        }
        
        // Creamos el array para guardar los juegos que seleccione el usuario
        const carrito = [];
        
        // Funcion para que al hacer click en un producto, se guarde en el array y en memoria
        function añadirCarrito(e) {
            // Determino el id del boton presionado
            let seleccionado = e.target.id;
            // buscamos el id del producto relacionado con el boton
            let producto = juegos.find(objeto => `juego${objeto.id}` == seleccionado);
            // Incluimos el producto seleccionado al carrito
            carrito.push(producto);
            const guardarLocal = (k,v) => localStorage.setItem(k,v);
            guardarLocal('listaCarrito',JSON.stringify(carrito));
        }
        
        // Obtenemos el array del carrito guardado en consola, y lo generamos en la sección de carrito
        const obtenerListaCarrito = JSON.parse(localStorage.getItem('listaCarrito'));
        const productosCarrito = [];
        if(seccionCarrito !== null) {
            for(const objetos of obtenerListaCarrito) {
                productosCarrito.push(new Carrito(objetos.nombre, objetos.id, objetos.genero, objetos.precio, objetos.imagen));
            }
            for(const productos of productosCarrito) {
                crearCarrito(productos);
            }
        }
        
        
        // ELIMINAR PRODUCTOS
        
        
        // Damos funcionalidad para borrar un producto del carrito
        let botonEliminarProd = document.getElementsByClassName('carrito__boton');
        for(const botones of botonEliminarProd) {
            botones.onclick = eliminarProdCarrito;
        }
        
        // Función para eliminar producto del carrito
        function eliminarProdCarrito(e) {
            let seleccionado = e.target;
            seleccionado.closest('.carritoContenedor').remove();
            limpiarHTML(carritoPrecio);
            generarTotalCarrito();
        }
        
        
        // Damos funcionalidad para vaciar todos los productos del carrito
        if(seccionCarrito !== null) {
            let botonVaciarCarrito = document.getElementById('carrito__vaciar');
            botonVaciarCarrito.onclick = vaciarCarrito;
        }
        
        // Función para vaciar el carrito
        function vaciarCarrito() {
            productosCarrito.length = 0;
            limpiarHTML(seccionCarrito);
            limpiarHTML(carritoPrecio);
            carritoPrecio.innerHTML = '$ 0.00';
        }
        
        
        // MOSTRAR TOTAL
        
        // Capturamos el span para cambiar el precio según los productos
        let carritoPrecio = document.getElementById('carrito-total--precio');
        
        function generarTotalCarrito() {
            let total = 0;
            for(const producto of productosCarrito) {
                total += producto.precio;
                limpiarHTML(carritoPrecio);
                carritoPrecio.innerHTML = total;
            }
        }
        generarTotalCarrito();
        
        
        // FINALIZAR COMPRA
        
        let botonComprar = document.getElementById('carrito__comprar');
        if(seccionCarrito !== null) {
            botonComprar.onclick = finalizarCompra;
        }
        
        function finalizarCompra() {
            if(seccionCarrito !== '') {
                seccionCarrito.innerHTML = '<p class="carrito__finalizar-compra">¡Gracias por tu compra!</p>';
            } else {
                seccionCarrito.innerHTML = '<p class="carrito__finalizar-compra--error">No tenés ningún producto en tu carrito.</p>';
            }
        }
        
        // FUNCIONES
        
        // Apartado Juegos
        // Evento para ordenar A-Z
        if(seccionJuegos !== null) {
            ordenJuegoAZ.onclick = () => ordenarAZ(seccionJuegos,juegos,crearProducto);
        function ordenarAZ(seccion,array,crearHTML) {
            limpiarHTML(seccion);
            array.sort(function (a, b) {
                if (a.nombre > b.nombre) {
                return 1;
                }
                if (a.nombre < b.nombre) {
                return -1;
                }
                return 0;
            });
            for(const producto of array) {
                crearHTML(producto);
            }
        }
        }
        
        // Evento para ordenar Z-A
        if(seccionJuegos !== null) {
            ordenJuegoZA.onclick = () => ordenarZA(seccionJuegos,juegos,crearProducto);
            function ordenarZA(seccion,array,crearHTML) {
                limpiarHTML(seccion);
                array.sort(function (a, b) {
                    if (a.nombre < b.nombre) {
                    return 1;
                    }
                    if (a.nombre > b.nombre) {
                    return -1;
                    }
                    return 0;
                });
                for(const producto of array) {
                    crearHTML(producto);
                }
            }
        }
        
        // Evento para ordenar por menor precio
        if(seccionJuegos !== null) {
            ordenJuegoMenorPrecio.onclick = () => ordenarMenorPrecio(seccionJuegos,juegos,crearProducto);
            function ordenarMenorPrecio(seccion,array,crearHTML) {
                limpiarHTML(seccion);
                array.sort(function (a, b) {
                    if (a.precio > b.precio) {
                    return 1;
                    }
                    if (a.precio < b.precio) {
                    return -1;
                    }
                    return 0;
                });
                for(const producto of array) {
                    crearHTML(producto);
                }
            }
        }
        
        // Evento para ordenar por mayor precio
        if(seccionJuegos !== null) {
            ordenJuegoMayorPrecio.onclick = () => ordenarMayorPrecio(seccionJuegos,juegos,crearProducto);
            function ordenarMayorPrecio(seccion,array,crearHTML) {
                limpiarHTML(seccion);
                array.sort(function (a, b) {
                    if (a.precio < b.precio) {
                    return 1;
                    }
                    if (a.precio > b.precio) {
                    return -1;
                    }
                    return 0;
                });
                for(const producto of array) {
                    crearHTML(producto);
                }
            }
        }
        
        
        // Apartado carrito
        
        
        // Generar el HTML de cada videojuego
        function crearProducto(objeto) {
            let contenedorJuego = document.createElement('article');
            contenedorJuego.classList.add('game');
            contenedorJuego.id = `juegoID${objeto.id}`;
            contenedorJuego.innerHTML = `<img class="game__img" src=${objeto.imagen} alt="${objeto.nombre}">
                                    <h2 class="game__title">${objeto.nombre}</h2>
                                    <div>
                                        <p class="game__price">Price: ${objeto.precio}$</p>
                                        <button class="carritoBoton" type="button" id="juego${objeto.id}">Add to Cart</button>
                                    </div>`;
            seccionJuegos.append(contenedorJuego);
            $('.game').hide().fadeIn();
        }
        
        function crearCarrito(objeto) {
            let contenedorCarrito = document.createElement('div');
            contenedorCarrito.classList.add('carritoContenedor');
            contenedorCarrito.id = `carritoID${objeto.id}`;
            contenedorCarrito.innerHTML = `<img class="carrito__img" src=${objeto.imagen} alt="${objeto.nombre}">
                                            <h2 class="carrito__title">${objeto.nombre}</h2>
                                            <p class="carrito__price">Price: $${objeto.precio}</p>
                                            <button class="carrito__boton" type="button" id="carrito${objeto.id}">X</button>`;
            seccionCarrito.appendChild(contenedorCarrito);
            $('.carritoContenedor').hide().fadeIn();
        }
        
        
        // Eliminar el HTML generado
        function limpiarHTML(seccion) {
            seccion.innerHTML='';
        }
    }
})
console.log(juegos);

/*
juegos.push(new Producto('FIFA 21', 1, 'deportes', 59.99, 'img/games/game1.jpg'));
juegos.push(new Producto('Call of Duty: Cold War', 2, 'fps', 69.99, 'img/games/game2.jpg'));
juegos.push(new Producto("Assassin's Creed", 3, 'aventura', 89.99, 'img/games/game3.jpg'));
juegos.push(new Producto('Cyberpunk 2077', 4, 'aventura', 29.99, 'img/games/game4.jpg'));
juegos.push(new Producto('Battlefield V', 5, 'fps', 59.99, 'img/games/game5.jpg'));
juegos.push(new Producto('The Last Of Us II', 6, 'horror', 59.99, 'img/games/game6.jpg'));
juegos.push(new Producto('Resident Evil VIII', 7, 'horror', 79.99, 'img/games/game7.jpg'));
juegos.push(new Producto('Red Dead Redemption 2', 8, 'aventura', 29.99, 'img/games/game8.jpg'));
juegos.push(new Producto('PES 2021', 9, 'deportes', 19.99, 'img/games/game9.jpg'));
juegos.push(new Producto('ARK', 10, 'aventura', 69.99, 'img/games/game10.jpg'));
juegos.push(new Producto('HALO: Infinite', 11, 'fps', 89.99, 'img/games/game11.jpg'));
juegos.push(new Producto('Animal Crossing', 12, 'simulador', 49.99, 'img/games/game12.jpg'));
juegos.push(new Producto('GTA V', 13, 'accion', 39.99, 'img/games/game13.jpg'));
juegos.push(new Producto('Uncharted 4', 14, 'aventura', 39.99, 'img/games/game14.jpg'));
juegos.push(new Producto('Minecraft', 15, 'aventura', 19.99, 'img/games/game15.jpg'));
juegos.push(new Producto('Age Of Empires IV', 16, 'estrategia', 39.99, 'img/games/game16.jpg'));
juegos.push(new Producto('Dragon Ball Xenoverse', 17, 'accion', 19.99, 'img/games/game17.jpg'));
juegos.push(new Producto('Chivalry II', 18, 'accion', 79.99, 'img/games/game18.jpg'));
juegos.push(new Producto('Far Cry 6', 19, 'aventura', 89.99, 'img/games/game19.jpg'));
juegos.push(new Producto('God Of War IV', 20, 'aventura', 49.99, 'img/games/game20.jpg'));
*/



// Dando funcionalidad al carrito de compras

// Guardamos los botones de los juegos para darles eventos

}) // Final ejecución ready



$().ready ( () => {
// Validar formulario

const datos = {
    nombre: '',
    email: '',
    mensaje: ''
}

$('#form').on('submit', function(e) {
    e.preventDefault();

    console.log(e);

    console.log(datos);

    // Validar el Formulario...

    const { nombre, email, mensaje } = datos;

    if(nombre === '' || email === '' || mensaje === '' ) {
        console.log('Al menos un campo esta vacio');
        $('#form').append('<p style="display: none" class="form__error">Todos los campos son obligatorios</p>');
        $('.form__error').fadeIn().delay(4000).fadeOut();
        return; // Detiene la ejecución de esta función
    }

    console.log('Todo bien...');
    $.post("https://jsonplaceholder.typicode.com/posts", datos, (respuesta, estado) => {
        if(estado == 'success') {
                $('#form').append('<p style="display: none" class="form__correcto">Mensaje enviado correctamente</p>');
                $('.form__correcto').fadeIn().delay(4000).fadeOut();
                console.log(respuesta);
        }
    })

});

// Eventos de los Inputs
$('#nombre').on('input', leerTexto);
$('#email').on('input', leerTexto);
$('#mensaje').on('input', leerTexto);

function leerTexto(e) {
    // console.log(e);
    // console.log(e.target.value);

    datos[e.target.id] = e.target.value;

    console.log(datos);
}
}) // Final Ejecución ready