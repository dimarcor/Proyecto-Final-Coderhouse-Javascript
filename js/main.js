// SECCIÓN DE PRODUCTOS Y CARRITO
$().ready ( () => {
// Guardar las secciones para generar el HTML
let seccionJuegos = document.getElementById('games');
const seccionCarrito = document.getElementById('listCarrito');


// Creamos la clase para el carrito
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
        const guardarLocal = (k,v) => localStorage.setItem(k,v);
        function añadirCarrito(e) {
            // Determino el id del boton presionado
            let seleccionado = e.target.id;
            // buscamos el id del producto relacionado con el boton
            let producto = juegos.find(objeto => `juego${objeto.id}` == seleccionado);
            for(let i = 0; i < carrito.length; i++) {
                if(carrito[i].id == producto.id) {
                    return;
                }
            }
            // Incluimos el producto seleccionado al carrito
            carrito.push(producto);
            console.log(carrito);
            guardarLocal('listaCarrito',JSON.stringify(carrito));
            
            // Mostramos alerta al añadir
            $('.alertas').addClass('alerta--activa');
            $('.alerta--activa').hide().fadeIn().delay(1000).fadeOut();
            if($('.alertas').hasClass('alerta--activa')){
                $('.alertas__añadir--texto').html(`Se ha añadido ${carrito.length} producto/s al carrito`);
            }
        }
        
        
        // Obtenemos el array del carrito guardado en consola, y lo generamos en la sección de carrito
        const obtenerListaCarrito = JSON.parse(localStorage.getItem('listaCarrito'));
        const productosCarrito = [];
        if(obtenerListaCarrito === null) {
            return;
        } else {
            if(seccionCarrito !== null) {
                for(const objetos of obtenerListaCarrito) {
                    productosCarrito.push(new Carrito(objetos.nombre, objetos.id, objetos.genero, objetos.precio, objetos.imagen));
                }
                for(const productos of productosCarrito) {
                    crearCarrito(productos);
                }
            }
        }
        
        
        // Apartado Juegos
        let ordenJuegoAZ = document.getElementById('a-z--game');
        let ordenJuegoZA = document.getElementById('z-a--game');
        let ordenJuegoMenorPrecio = document.getElementById('lowPrice--game');
        let ordenJuegoMayorPrecio = document.getElementById('highPrice--game');

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
            for(const boton of botonesCompra) {
                boton.onclick = añadirCarrito;
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
                for(const boton of botonesCompra) {
                    boton.onclick = añadirCarrito;
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
                for(const boton of botonesCompra) {
                    boton.onclick = añadirCarrito;
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
                for(const boton of botonesCompra) {
                    boton.onclick = añadirCarrito;
                }
            }
        }

        // Barra de búsqueda
        if(seccionJuegos !== null) {
            const barraBusqueda = document.querySelector('#search-bar');
            const botonBusqueda = document.querySelector('#search-bar__button');
    
            const filtrar = () => {
                seccionJuegos.innerHTML = '';
                console.log('Búsqueda: ' + barraBusqueda.value);
                const texto = barraBusqueda.value.toLowerCase();
                for(const producto of juegos) {
                    let nombre = producto.nombre.toLowerCase();
                    if(nombre.indexOf(texto) !== -1) {
                        crearProducto(producto);
                        for(const boton of botonesCompra) {
                            boton.onclick = añadirCarrito;
                        }
                    }
                }
                if(seccionJuegos.innerHTML === '') {
                    seccionJuegos.innerHTML += `
                    <p class="busqueda-error">Producto no encontrado...</p>
                    `
                }
            }
            botonBusqueda.addEventListener('click', filtrar);
        }

        // CARRITO

        // ELIMINAR PRODUCTOS
        
        // Damos funcionalidad para borrar un producto del carrito
        let botonEliminarProd = document.getElementsByClassName('carrito__boton');
        for(const botones of botonEliminarProd) {
            botones.onclick = eliminarProdCarrito;
        }
        
        // Función para eliminar producto del carrito
        let listaCarritoEliminar;
        function eliminarProdCarrito(e) {
            let seleccionado = e.target;
            console.log(seleccionado);
            seleccionado.closest('.carritoContenedor').remove();
            eliminarProdStorage();
            let total = 0;
            generarTotalCarrito();
        }
        function eliminarProdStorage() {
            listaCarritoEliminar = JSON.parse(localStorage.getItem('listaCarrito'));
            console.log(listaCarritoEliminar);
            let productoSeleccionado = listaCarritoEliminar.find(producto => producto.id == producto.id);
            console.log(productoSeleccionado);
            let productoIndice = listaCarritoEliminar.indexOf();
            listaCarritoEliminar.splice(productoIndice, 1);
            console.log(listaCarritoEliminar);
            guardarLocal('listaCarrito',JSON.stringify(listaCarritoEliminar));
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
            localStorage.removeItem('listaCarrito');
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
                totalLimpio = total.toFixed(2)
                carritoPrecio.innerHTML = '$' + totalLimpio;
            }
        }
        generarTotalCarrito();
        
        
        // FINALIZAR COMPRA
        
        let botonComprar = document.getElementById('carrito__comprar');
        if(seccionCarrito !== null) {
            botonComprar.onclick = finalizarCompra;
        }
        
        function finalizarCompra() {
            const listaProdFinal = JSON.parse(localStorage.getItem('listaCarrito'));
            console.log(listaProdFinal);
            if(listaProdFinal === null) {
                seccionCarrito.innerHTML = '<p class="carrito__finalizar-compra--error">No tenés ningún producto en tu carrito.</p>';
                return;
            } else {
                if(listaProdFinal.length !== 0) {
                    seccionCarrito.innerHTML = '<p class="carrito__finalizar-compra">¡Gracias por tu compra!</p>';
                    let total = 0;
            for(const producto of listaProdFinal) {
                total += producto.precio;
                limpiarHTML(carritoPrecio);
                totalLimpio = total.toFixed(2)
                carritoPrecio.innerHTML = '$' + totalLimpio;
            }
                    localStorage.removeItem('listaCarrito');
                }
            }
        }
        
        
        // Apartado carrito
        
        // Generar el HTML de cada videojuego
        function crearProducto(objeto) {
            let contenedorJuego = document.createElement('article');
            contenedorJuego.classList.add('game');
            contenedorJuego.id = `${objeto.id}`;
            contenedorJuego.innerHTML = `<img class="game__img" src=${objeto.imagen} alt="${objeto.nombre}">
                                    <h2 class="game__title">${objeto.nombre}</h2>
                                    <div>
                                        <p class="game__price">Precio: ${objeto.precio}$</p>
                                        <button class="carritoBoton" type="button" id="juego${objeto.id}">Add to Cart</button>
                                    </div>`;
            seccionJuegos.append(contenedorJuego);
            $('.game').hide().fadeIn();
        }
        
        function crearCarrito(objeto) {
            let contenedorCarrito = document.createElement('div');
            contenedorCarrito.classList.add('carritoContenedor');
            contenedorCarrito.id = `${objeto.id}`;
            contenedorCarrito.innerHTML = `<img class="carrito__img" src=${objeto.imagen} alt="${objeto.nombre}">
                                            <h2 class="carrito__title">${objeto.nombre}</h2>
                                            <p class="carrito__price">Precio: $${objeto.precio}</p>
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

    
    if(nombre === '' || email === '' || mensaje === '') {
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
                localStorage.setItem('datosUsuario',JSON.stringify(datos));
                console.log(datos);
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