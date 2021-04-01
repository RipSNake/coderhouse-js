/*
*
*	Proyecto Final
*
*	Simulador de carro de compras
*
*	---------------------------------
*
*	PRIMERA ENTREGA
*
*	Sugerencia: Verificar Rúbrica
*
*	Objetivos Generales:
*		1) Codificar la funcionalidad inicial del simulador
*		2) Identificar el flujo de trabajo del script en terminos de captura de entradas ingresadas
*		por el usuario, procesamiento esencial del simulador y notificacion de resultados en forma
*		de salida.
*
*	Objetivos Especificos:
*		1) Capturar entradas mediante prompt()
*		2) Declarar variables y objetos necesarios para simular el proceso seleccionado
*		3) Crear funciones y/o metodos para realizar operaciones (Suma, Resta, Concatenar, etc)
*		4) Efectuar una salida que es el resultado de los datos procesados, la cual puede hacerse por
*		alert() o por console.log().
*
*	Se debe Entregar:
*		Estructura HTML del proyecto
*		Variables JS necesarias
*		Funciones Esenciales del proceso a simular
*		Objetos JS
*
*/

/////////////////
// Incorporar LocalStorage para guardar el usuario que esta logueado en el navegador
// y recuperarlo cada vez que se inicia la ventana
////////////////

window.onload = function() {
	console.log('index.js working');
	agregarProductoRandom(20);
	mostrarProductos(productosList);
};


/* Simulador de Carro de compras */

/*****************CONTRUCTORES OBJETOS********************/


// Constructor de Usuarios
class Usuario {
	constructor(nombre,email,password) {
		this.id = asignarIdUsuario();
		this.nombre = nombre;
		this.email = email;
		this.password = password;
		this.carros = [];
		this.activo = true;
		this.crearCarro();
	}

	verId() {
		return this.id;
	};

	verUsuario() {
		console.log(this);
	};

	cambiarNombre(nombre) {
		this.nombre = nombre;
		console.log('Nuevo Nombre: '+this.nombre);
	};

	cambiarEmail(email) {
		if(this.email != email) {
			this.email = email;
			console.log('Nuevo Email: '+this.email);
		}
	};

	cambiarContraseña(nueva_password) {
		if(validarClave(nueva_password) && this.password != nueva_password) {
			this.password = nueva_password;
			console.log('Password Actualizada');
		};
	};

	estaActivo() {
		return this.activo;
	};

	activarUsuario() {
		if(!estaActivo()) {
			this.activo = true;
			console.log('Usuario '+this.email+' Activado');
		} else {
			console.log('El usuario '+this.email+' ya está Activo');
		}
	}

	darDeBaja() {
		if(estaActivo()) {
			this.activo = false;
			console.log('Usuario '+this.email+' Dado de Baja');
		} else {
			console.log('El usuario '+this.email+' ya se encuentra deshabilitado');
		}
	};
	// genera un nuevo carro de compras
	crearCarro() {
		if(!this.hayCarroActivo()) {
			let carroNuevo = new Carro(this.id);
			this.carros.push(carroNuevo);
		} else {
			console.log('Aun hay un carro sin vender');
		}
	};
	// ver carro activo
	getCarroActivo() {
		for(let c of this.carros) {
			if(!c.yaSeVendio()) {
				return c;
			};
		};
		// si no encuentra ningún carro activo llega hasta acá y devuelve undefined
		console.log('No existe ningún carro pendiente de compra');
	};
	// confirmar compra del carro
	comprarCarro() {
		carro = this.getCarroActivo();
		text = 'Está seguro de que desea comprar el carro con un total de '+carro.cantidadProductos()+' productos por un total de '+carro.getPrecioTotal()+' ?';
		if(confirm(text)) {
			carro.comprarCarro();
		} else {
			console.log('Compra del carro Cancelada');
		};
	};
	// vaciar carro
	vaciarCarro() {
		this.getCarroActivo().vaciarCarro();
	};
	// verifica si hay algún carro activo que aún no se haya comprado
	hayCarroActivo() {
		if(this.carros.length > 0) {
			for(let c of this.carros) {
				if(!c.yaSeVendio()) {
					return true;
				};
			};
		};
		// si no hay carros o ya fueron todos comprados
		return false;
	};
};
// Constructor Carro de Compras
class Carro {
	constructor(usuario_id) {
		this.id = asignarIdCarro();
		this.usuario_id = usuario_id;
		this.productos = []; // lo ideal seria que este compuesto por { id_producto, cantidad }
		this.vendido = false;
	}

	// ver id del carro
	getIdCarro() {
		return this.id;
	};
	// ver quien es el usuario dueño del carro
	verDueño() {
		for(let user of usuariosList) {
			if(user.id === this.usuario_id) {
				return user;
			}
		}
		// if the user id not found due to an error
		console.log('User not found');
	};
	// muestra por consola todos los productos
	verProductos() {
		for(let prod of this.productos) {
			prod.producto.verProducto();
		}
	};
	// devuelve la cantidad total de productos en el carro
	cantidadProductos() {
		return this.productos.length;
	}
	// devuelve el precio total del carro
	getPrecioTotal() {
		let total = 0;
		for(let prod of this.productos) {
			total += prod.price;
		}
		return total;
	}
	// agrega un producto y la cantidad de unidades que queremos de ese producto
	agregarProducto(producto,cantidad) {
		if(this.yaSeVendio()){
			console.log('No se puede completar la acción el carro ya fue vendido');
		} else {
			if(producto.estaALaVenta()){
				this.productos.push({producto, cantidad});	
			}
				console.log('El producto ya NO esta a la venta');
		};
	};
	// Quitar producto del carro. Si ya se venció no se puede quitar
	quitarProducto(producto) {
		if(!this.yaSeVendio()) {
			for(let prod of this.productos) {
				if(prod.id === producto.id) {
					return this.productos.splice(this.productos.indexOf(prod),1);
				}
			}
		} else {
			console.log('No se puede completar la acción el carro ya fue vendido');
		}
		return null;
	}
	// vaciar los productos del carro
	vaciarCarro() {
		if(this.yaSeVendio()) {
			console.log('El carro ya ha sido vendido. NO puede editarse');
		} else {
			if(confirm('Está seguro que desea eliminar todos los productos?')){
				while(this.productos.length > 0) {
					this.productos.pop();
				}
			}
		}
	};
	// informar si ya se vendio o no
	yaSeVendio() {
		return this.vendido;
	};
	// comprar el carro y todos sus productos
	comprarCarro() {
		if(!this.yaSeVendio()) {
			this.vendido = true;
			console.log('Carro Comprado Correctamente');
		};
	};

};

// Constructor de Productos
class Producto {
	constructor(nombre,marca,precio) {
		this.id = asignarIdProducto();
		this.nombre = nombre;
		this.marca = marca;
		this.precio = precio;
		this.enVenta = true;
	}

	verProducto() {
		console.log('----------------------');
		console.log('Nombre: ',this.nombre);
		console.log('Marca: ',this.marca);
		console.log('Precio: ',this.precio);
		console.log('----------------------');
	};

	getProducto() {
		return this;
	};

	getIdProducto() {
		return this.id;
	};

	cambiarPrecio(precio) {
		this.precio = precio;
	};

	estaALaVenta() {
		return this.enVenta;
	};

	cambiarEstadoVenta() {
		if(this.enVenta) {
			this.enVenta = false;
		} else {
			this.enVenta = true;
		};
	};
};

/***************FIN CONTRUCTORES OBJETOS******************/


// variables
let usuariosList = [];
let productosList = [];
let carros = 0;

let usuarioLogueado = undefined;


/* Usuarios de prueba para verificar validaciones */
usuariosList.push(new Usuario('Analia','ana@gmail.com','soyLaliad4'));
usuariosList.push(new Usuario('Carlos','el_charly@outlook.es','charlando545V'));
usuariosList.push(new Usuario('Prueba','usuarioprueba@yahoo.com.ar','m1Password'));

// eventListeners
//document.getElementById('manually-add-prod').addEventListener('click', crearProductoManual);
document.getElementById('add-product-form').addEventListener('submit', crearProductoPorFormulario);
document.getElementById('show-prod-list').addEventListener('click',mostrarProductos);
document.getElementById('show-cart').addEventListener('click',verCarro);
document.getElementById('vaciarCarro').addEventListener('click',vaciarCarro);
document.getElementById('comprarCarro').addEventListener('click',comprarCarro);
document.getElementById('sort-by').addEventListener('change',ordenarProductos);

// functions

function asignarIdUsuario() {
		return (usuariosList.length + 1);
};

// funcion autoincrementante que asignar un id unico a cada carro
function asignarIdCarro() {
	return (carros.length + 1);
};

function asignarIdProducto() {
		return (productosList.length + 1);
};

// Funcion de validacion de password
validarClave = function(password) {
		// valida la longitud de la clave
		if(password.length >= 8) {
			// verifica que contenga al menos un número
			let hasNumber = false;
			let numbers = [0,1,2,3,4,5,6,7,8,9];
			for(let i = 0; i < numbers.length && !hasNumber; i++) {
				// Si contiene al menos un número avanza a validar Mayúsculas
				if(password.search(numbers[i]) != -1) { 
					hasNumber = true;
				};
			};
			if(hasNumber) {
				// Si contiene al menos una letra mayúscula retorna verdadero
				if(password.search(/[ABCDEFGHIJKLMNÑOPQRSTUVWXYZ]/) != -1) {
					console.log('Contraseña correcta');
					return true;	
				} else {
					console.log('Contraseña incorrecta: Debe contener al menos un letra Mayúscula');
				};
			} else { 
				console.log('Contraseña incorrecta: No posee números');
				return false;
			};
		} else { // si no cumple con la longitud retorna false
			console.log('La contraseña no es lo suficientemente larga');
			return false;
		};
	};


// crear usuario
function crearUsuario() {
	// estas funciones de peticion de datos despues seran manejadas por formularios
	let name, email, password, flag;
	do {
		name = prompt('Como te llamas?\n(Debe contener al menos 3 caracteres)');
		email = prompt('Ingresa tu dirección de email');
		password = prompt(name + ': Cree su clave de acceso (debe tener al menos 8 caracteres y contener al menos un número y una letra Mayúscula)');
	} while(name.length < 3 || !validarClave(password));
	flag = confirm(`Estos datos son correctos?:\nName: ${name}\nEmail: ${email}`);
	if(flag) {
		let usuarioNuevo = new Usuario(name,email,password);
		agregarUsuario(usuarioNuevo);
		return usuarioNuevo;	
	}	else {
		console.log('Proceso Cancelado');
	}
};
// agregar usuario a la lista de usuarios
function agregarUsuario(usuario) {
	if(usuario != undefined && usuario != null) {
		for(let usu of usuariosList) {
			if(usu.email == usuario.email) {
				return 'El email ya está en uso';
			}
		}
		usuariosList.push(usuario);
		console.log('usuario agregado exitosamente');
	} else {
		console.log('ERROR usuario inválido');
	}
};
// quitar un usuario
function quitarUsuario(usuario) {
	for(let usu of usuariosList) {
		if(usu === usuario) {
			usu.activo = false;
		}
	}
};
// quitar un usuario por email
function quitarUsuario(usuario_email) {
	for(let usu of usuariosList) {
		if(usu.id === usuario_email) {
			usu.activo = false;
			console.log('Usuario Desactivado');
		}
	}
};
// logear con un usuario
function logIn(usuario) {
	usuarioLogueado = usuario;
	alert('Usuario '+usuarioLogueado.nombre+' logueado correctamente');
	activarControles();
};
// deslogearse
function logOut() {
	if(confirm('Esta seguro que desea desloguearse?')) {
		console.log('Usted ha sido deslogueado correctamente');
		usuarioLogueado = undefined;
		desactivarControles();
	} else {
		console.log('Gracias por continuar con nosotros');
	}
}
// crea un usuario nuevo y lo loguea
function signIn() {
	if(!estaLogueado()) {
		let usuario = crearUsuario();
		if(confirm('Desea loguearse para comenzar a operar en Boutique JShop ?')){
			logIn(usuario);
		}
	} else {
		alert(`Ya está logeado como ${usuarioLogueado.nombre}`);
	}
}
// verifica si hay algun usuario logueado
function estaLogueado(){
	if(usuarioLogueado == undefined || usuarioLogueado == null) {
		return false;
	} else {
		return true;
	}
}
// activar controles de carga de productos manuales y ver carro
function activarControles() {
	if(estaLogueado()) {
		let formFieldset = document.getElementById('add-product-form').getElementsByTagName('fieldset')[0];
		let cartControls = document.getElementById('cart-controls');
		formFieldset.disabled = false;
		cartControls.disabled = false;
	} else {
		console.log('No esta Logueado');
	}
}
// desactivar controles
function desactivarControles() {
	if(!estaLogueado()) {
		let formFieldset = document.getElementById('add-product-form').getElementsByTagName('fieldset')[0];
		let cartControls = document.getElementById('cart-controls');
		formFieldset.disabled = true;
		cartControls.disabled = true;
	} else {
		console.log('Usuario aun Logueado');
	}
}

// crear un producto a traves de un formulario
function crearProductoPorFormulario(event) {
	event.preventDefault();

}

// comprar producto
function comprarProducto(event) {
	console.log(event.srcElement.prodId);
	if(estaLogueado()) {
		for(let prod of productosList) {
			if(event.srcElement.prodId == prod.id) {
				usuarioLogueado.getCarroActivo().agregarProducto(prod,1);		
			}
		}
		
	} else {
		console.log('No hay usuario logueado para realizar la compra');
	}
}

// FUNCIONES DE VISUALIZACION

// genera un cuadro donde se aloja cada uno de los productos disponibles de la tienda
function mostrarProductos() {
	limpiarVistaCarro();
	limpiarVistaProductos();
	let visualPanel = document.getElementById('prod-list');
	for(let prod of productosList) {
		// contenedor individual de cada producto
		let card = document.createElement('div');
		card.classList.add('card');
		card.classList.add('col-12');
		//card.classList.add('col-sm-6');
		let cardBody = document.createElement('div');
		cardBody.classList.add('card-body');
		// create elements to display products information
		let id = document.createElement('span');
		id.setAttribute('display','none');
		id.appendChild(document.createTextNode(prod.id));
		// nombre del producto
		let nombre = document.createElement('h3');
		nombre.classList.add('card-title');
		nombre.appendChild(document.createTextNode(prod.nombre));
		// marca del producto
		let marca = document.createElement('p');
		marca.classList.add('card-subtitle');
		marca.appendChild(document.createTextNode(prod.marca));
		// precio del producto
		let precio = document.createElement('p');
		precio.classList.add('card-text');
		precio.appendChild(document.createTextNode(prod.precio));
		// esta en venta o no
		let disponible = document.createElement('p');
		if(prod.enVenta) {
			disponible.appendChild(document.createTextNode('Disponible'));
			
		} else {
			disponible.appendChild(document.createTextNode('AGOTADO'));
			disponible.classList.add('agotado');
		}
		let comprar = document.createElement('button');
		comprar.classList.add('btn');
		comprar.classList.add('btn-primary');
		comprar.appendChild(document.createTextNode('COMPRAR'));
		comprar.setAttribute('prodId',prod.id);
		comprar.addEventListener('click',comprarProducto);

		// agrega la informacion al contenedor
		cardBody.appendChild(nombre);
		cardBody.appendChild(marca);
		cardBody.appendChild(precio);
		cardBody.appendChild(disponible);
		cardBody.appendChild(comprar);
	
		card.appendChild(cardBody);
		let div = document.createElement('div');
		div.classList.add('col-sm-6');
		div.appendChild(card);
		// agrega el contenedor del producto a la vista
		visualPanel.appendChild(div);
	};
	console.log('Productos cargados a la vista');
};

// eliminar elementos de la vista de productos para insertar los nuevos
function limpiarVistaProductos() {
	let visualPanel = document.getElementById('prod-list');
	while(visualPanel.firstChild) {
		visualPanel.removeChild(visualPanel.lastChild);
	};
};


// cambiar orden de los productos
function ordenarProductos(events) {
	console.log('Ordenar!');
	switch(events.srcElement.value) {
		case 'descend':
			productosList.sort(ordenPorMayorPrecio);
			break;
		case 'ascend':
			productosList.sort(ordenPorMenorPrecio);
			break;
		default:
			console.log('Orden no especificado');
			break;
	}
	mostrarProductos();
}
// ordenar de forma ascendente
function ordenPorMenorPrecio(a, b) {
	if ( parseFloat(a.precio) < parseFloat(b.precio) ) {
		return -1;
	}
	if ( parseFloat(a.precio) > parseFloat(b.precio) ) {
		return 1;
	}
	return 0;
};
// ordenar de forma descendente
function ordenPorMayorPrecio(a, b) {
	if ( parseFloat(a.precio) < parseFloat(b.precio) ) {
		return 1;
	}
	if ( parseFloat(a.precio) > parseFloat(b.precio) ) {
		return -1;
	}
	return 0;
}


// Funciones de la vista del carro de compras
// verCarro() muestra la lista de productos que hay en el carro actual
function verCarro() {
	
	if(estaLogueado()) {
		limpiarVistaProductos();
		limpiarVistaCarro();
		//carroActivo = usuarioLogueado.getCarroActivo();
		let carro = document.getElementById('carro-list');
		console.log(usuarioLogueado.getCarroActivo().productos);
		for(let prod of usuarioLogueado.getCarroActivo().productos) {
			console.log(prod);
			carro.appendChild(mostrarProductosCarro(prod.producto));
		}
	} else {
		alert('Primero debe iniciar sesión');
	}
};

function mostrarProductosCarro(producto) {
	let prodCarro = document.createElement('div');
	prodCarro.classList.add('row');
	// img display
	//let img = document.createElement('img');
	//img.classList.add('col-2');
	//img.setAttribute('src',producto.img);
	// nombre
	let nombre = document.createElement('h5');
	nombre.classList.add('col-4');
	nombre.appendChild(document.createTextNode(producto.nombre));
	// marca
	let marca = document.createElement('p');
	marca.classList.add('col-2');
	marca.appendChild(document.createTextNode(producto.marca));
	// precio
	let precio = document.createElement('p');
	precio.classList.add('col-4');
	precio.appendChild(document.createTextNode(producto.precio));
	// cantidad
	let cantidad = document.createElement('p');
	cantidad.classList.add('col-2');
	cantidad.appendChild(document.createTextNode(producto.cantidad));

	//prodCarro.appendChild(img);
	prodCarro.appendChild(nombre);
	prodCarro.appendChild(marca);
	prodCarro.appendChild(precio);
	prodCarro.appendChild(cantidad);

	return prodCarro;
};

function limpiarVistaCarro() {
	let carroList = document.getElementById('carro-list');
	while(carroList.firstChild) {
		carroList.removeChild(carroList.lastChild);
	};
}; 

// vacia todos los elementos del carro de compras
function vaciarCarro() {
	if(usuarioLogueado.getCarroActivo()){
		usuarioLogueado.getCarroActivo().vaciarCarro();
	}
};

function comprarCarro() {
	if(confirm('Desea comprar el carro por un total de $'+usuarioLogueado.getCarroActivo().getPrecioTotal()+' ?')){
		usuarioLogueado.getCarroActivo().comprarCarro();
	} else {
		alert('Compra cancelada');
	}
};

































/* ------------------------------------------------------------- */



/**
*
*
*		Adicionales para agregar productos
*
*
*/


function agregarProductoRandom(cantidad) {
	let nombres = ['Lavadora','Cuchilla','Desmalezadora','Motocicleta'];
	let marcas = ['Kieffer','Loinen','Trine','Yorkee','Amard'];
	let precioMaximo = 4434.87;

	for(let i = 0; i < cantidad; i++) {
		let nombre, marca, precio, prod;
		nombre = nombres[parseInt(Math.random() * nombres.length)];
		marca = marcas[parseInt(Math.random() * marcas.length)];
		precio = (Math.random() * precioMaximo).toFixed(2);
		prod = new Producto(nombre, marca, precio);
		productosList.push(prod);
	}
}