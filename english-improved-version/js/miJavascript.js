/*
*
*	Coderhouse Final Project 
*
*	JavaScript Course 12440
*
*	Client side Cart Simulator 2021
*
*
* // #Check Local Storage to be saved when actions get done
*
*
*
*	---------------------------------
*
*
*
/////////////////
// Use LocalStorage to save the user session information
// and retrieve it back when the page gets reloaded
//
//	
////////////////
*/

// REQUIERED FILES: Product.js, Cart.js, User.js

// log in console when DOM is ready for correct manipulation
$(document).ready(function() {
	console.log('DOM is ready for manipulation');
});
// the next fn executes once the window is loaded (imgs, etc)
window.addEventListener('load', function(event) {
	console.log('index.js working');
	generateRandomProduct(20);
	displayProducts();
	toggleControls();

	// Retrieves the last user loggedIn if the information is saved in the localStorage
	retrieveLastSession();

	console.log(`User examples: 
		User: Analia, Password: soyLaliad4
		User: Carlos, Password: charlando545V
		User: Prueba, Password: m1Password`);
});


/* Cart Simulator */


// variables
let userList = [];
let productList = [];
let carts = 0;

let loggedUser = undefined;


/* Usuarios de prueba para verificar validaciones */
userList.push(new User('Analia','ana@gmail.com','soyLaliad4'));
userList.push(new User('Carlos','el_charly@outlook.es','charlando545V'));
userList.push(new User('Prueba','usuarioprueba@yahoo.com.ar','m1Password'));

// eventListeners
$('#signin-form').submit(function(event) {
	event.preventDefault();
	signIn($(this).serializeArray());
});
$('#signin-btn').on('click', () => {
	toggleSignin();
	toggleLogin();
})
$('#username').on('click', signIn);
$('#login-btn').on('click', () => {
	toggleSignin();
	toggleLogin();
})
$('#login-form').submit(function(event) {
	event.preventDefault();
	logInForm($(this).serializeArray())
});
$('#logout').on('click', logOut);
$('#toggle-menu').on('click',toggleMenu);
$('#show-prod-list').on('click', displayProducts);
$('#cart-icon').on('click', showCart);
$('#show-cart').on('click', showCart);
$('#clean-cart').on('click', emptyCart);
$('#buy-cart').on('click', buyCart);
$('#sort-by').on('change', sortProducts);

// functions
// autoincrement functions for object creation porpuses
function assignUserId() {
		return (userList.length + 1);
};

function assignCartId() {
	return (carts + 1);
};

function assignProductId() {
		return (productList.length + 1);
};
// get last user session
function retrieveLastSession() {
	if(localStorage.getItem('user') != null) {
			let u = new User();
			let user = JSON.parse(localStorage.getItem('user'));
			user = Object.assign(u,user);
			for(let i = 0; i < user.carts.length; i++) {
				user.carts[i] = Object.assign(new Cart(), user.carts[i]);
				for(let j = 0; j < user.carts[i].products.length; j++) {
					user.carts[i].products[j] = Object.assign(new Product(), user.carts[i].products[j]);
				}
			}
			loggedUser = user;
			updateCartItems();
			toggleHome();
			toggleLoggedInDisplay();
			$('#username').off('click', signIn);
			$('#username').text(`${loggedUser.name}`);
		}
};
// save actual session
function saveSession() {
	localStorage.setItem('user', JSON.stringify(loggedUser));
}
// Add user to the User List
function addUser(user) {
	if(user != undefined && user != null) {
		for(let usu of userList) {
			if(usu.email == user.email) {
				return 'The email entered is already registered';
			}
		}
		userList.push(user);
		console.log('user added successfully');
	} else {
		console.log('ERROR invalid user');
	}
};
// Creates a new User and logs in
function signIn(form) {
	
	console.log('SIGN IN: ',form);
	if(!isLogged()) {
		
	} else {
		alert(`Ya está logeado como ${loggedUser.nombre}`);
	}
}
// User Login form -> receives the form as an array of object using .serializeArray()
function logInForm(form) {
	if(isLogged()){
		console.log('User already Logged in');
	} else {
		// receives the form as an array of objects
		let user = form.find( (el) => { return (el.name == 'user')}).value;
		let pass = form.find( (el) => { return (el.name == 'password')}).value;

		for(let u of userList) {
			if(u.name == user) {
				// If the user exists -> check the password
				if(u.password == pass) {
					// if the password is correct
					loggedUser = u;
					activateControls();
					
					localStorage.setItem('user', JSON.stringify(u));
				
					updateCartItems();
					toggleHome();
					toggleProducts();
					$('#username').off('click', signIn);
				} else {
					console.log('password erroneo');
				}
			}
		}
	}
};
// User logout
function logOut() {
	if(loggedUser != undefined) {
		if(confirm('Are you sure that you wanna logout?')) {
			loggedUser = undefined;
			console.log('Logged out successfully');
			$('#username').text('Login');
			deactiveControls();
			localStorage.removeItem('user');
			updateCartItems();
			toggleHome();
			toggleLoggedInDisplay();
			$('#username').on('click', signIn);
		} else {
			console.log('Thanks for continue with us');
		}
	} else {
		// continues logged in
	}
}
// verifica si hay algun usuario logueado
function isLogged(){
	if(loggedUser == undefined || loggedUser == null) {
		return false;
	} else {
		return true;
	}
}
// Update cart products in the view
function updateCartItems() {
	if(loggedUser != undefined && loggedUser.getActiveCart() != undefined) {
		document.getElementById('cart-items').innerText = loggedUser.getActiveCart().productsQuantity();
	} else {
		document.getElementById('cart-items').innerText = 0;
	}
};
// activar controles de carga de productos manuales y ver carro
function activateControls() {
	if(isLogged()) {
		
		let cartControls = document.getElementById('cart-controls');
		
		cartControls.disabled = false;
	} else {
		console.log('You\'re not logged in');
	}
}
// desactivar controles
function deactiveControls() {
	if(!isLogged()) {
		
		let cartControls = document.getElementById('cart-controls');
		
		cartControls.disabled = true;
	} else {
		console.log('User still Logged in');
	}
}

// comprar producto
function purchaseProduct(event) {
	let id = event.target.id.slice(3);
	if(isLogged()) {
		for(let p of productList) {
			if(id == p.id) {
				loggedUser.getActiveCart().addProduct(p,1);
				updateCartItems();
				saveSession();	
			}
		}
	} else {
		console.log('Please login in order to purchase this item');
	}
}

// FUNCIONES DE VISUALIZACION

// show/hide home section
function toggleHome() {
	$('#home').toggleClass('hide');
}
// show/hide products and cart div
function toggleLoggedInDisplay() {
	$('#logged-in-display').toggleClass('hide');
}
// toggle controls
function toggleControls() {
	$('#controls').toggleClass('hide');
}
// toggle login form
function toggleSignin() {
	$('#signin').toggleClass('hide');
}
// toggle signin form
function toggleLogin() {
	$('#login').toggleClass('hide');
}
// toggle products list view
function toggleProducts() {
	$('#prod-list-display').toggleClass('hide');
	$('#cart').toggleClass('hide');
}
// toggle cart list view
function toggleCart() {
	$('#cart').toggleClass('hide');
	$('#prod-list-display').toggleClass('hide');
}
// toggle user-menu 
function toggleMenu() {
	$('#user-menu').toggleClass('hide');
}
// genera un cuadro donde se aloja cada uno de los productos disponibles de la tienda
function displayProducts() {
	let visualPanel = $('#prod-list');
	for(let prod of productList) {
		let available = `<p>Available</p>`;
		if(!prod.available) {
			let available = `<p class="soldout">SOLD OUT</p>`;
		}
		// contenedor individual de cada producto
		$('#prod-list').append(`
			<div class="col-sm-12 col-md-6 col-lg-4 col-xlg-3 mb-4">
				<div class="card col-12 prod-tile">
					<div class="card-body">
						<span style="display: none;">${prod.id}</span>
						<h3 class="card-title">${prod.name}</h3>
						<p class="card-subtitle">${prod.trademark}</p>
						<p class="card-text">${prod.price}</p>
						${available}
						<button class="btn btn-primary" id="btn${prod.id}">COMPRAR</button>
					</div>
				</div>
			</div>`);

		$(`#btn${prod.id}`).on('click', purchaseProduct);
	};
};

// cambiar orden de los productos
function sortProducts(event) {
	switch(event.target.value) {
		case 'descend':
			productList.sort(ordenPorMayorPrecio);
			break;
		case 'ascend':
			productList.sort(ordenPorMenorPrecio);
			break;
		default:
			// nothing
			break;
	}
	displayProducts();
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
function showCart() {
	if(isLogged()) {
		toggleCart();
		toggleProducts();
	} else {
		alert('Primero debe iniciar sesión');
	}
};

function appendCartProducts() {
	if(loggedUser.getActiveCart().cantidadProductos() > 0) {
			for(let p of loggedUser.getActiveCart().products) {
				$('#cart-list').append(`<div class="row">
		<h5 class="col-4">${p.product.name}</h5>
		<p class="col-2">${p.product.trademark}</p>
		<p class="col-4">${p.product.price}</p>
		<p class="col-2">${p.cantidad}</p>
	</div>`);
			}
		} else {
			$('#cart-list').append('<div class="row"><p class="col">CARRO VACIO</p></div>');
		}
};

// vacia todos los elementos del carro de compras
function emptyCart() {
	if(loggedUser.getActiveCart()){
		loggedUser.getActiveCart().emptyCart();
		updateCartItems();
	}
};

function buyCart() {
	if(confirm('Do you want to buy the current cart for a total of $'+loggedUser.getActiveCart().getTotalPrice()+' ?')){
		loggedUser.getActiveCart().buyCart();
	} else {
		alert('Purchase Canceled');
	}
};

































/* ------------------------------------------------------------- */



/**
*
*
*		Aditional functions to deliver a better simulation
*
*
*/


function generateRandomProduct(quantity) {
	let names = ['Lavadora','Cuchilla','Desmalezadora','Motocicleta'];
	let trademarks = ['Kieffer','Loinen','Trine','Yorkee','Amard'];
	let maxPrice = 4434.87;

	for(let i = 0; i < quantity; i++) {
		let name, trademark, price, p;
		name = names[parseInt(Math.random() * names.length)];
		trademark = trademarks[parseInt(Math.random() * trademarks.length)];
		price = (Math.random() * maxPrice).toFixed(2);
		p = new Product(name, trademark, price);
		productList.push(p);
	}
};

// prepare bill
function generateBill(cart) {
	let date = new Date(Date.now()); // Is the same as "let date = Date();"
	let details = `
	<header>
		<h1>Boutique JShop</h1>
		<h2>Cart ${cart.id}</h2>
		<h2>Comprador: Usuario ${cart.user_id}</h2>
		<h3>Fecha: ${date}</h3>
	</header>
	<main>
		<table>
			<tr>
				<th>Name</th>
				<th>Trademark</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Total</th>
			</tr>`;
			
	for(let p of cart.productos) {
		details += `<tr><td>${p.producto.nombre}</td><td>${p.producto.marca}</td><td>${p.producto.precio}</td><td>${p.cantidad}</td><td>${(p.producto.precio * p.cantidad).toFixed(2)}</td></tr>`;
	}
	
	details += `</table></main><footer>Phone: +43215678 Domicilio: Calle Tipeada 24/7</footer>`;
	
	console.log('Bill Details: ',details);

	let bill = new Blob([details],{details: 'text/html;charset:utf-8'});
	saveBlob(bill,`factura_${cart.user_id}${cart.id}${Date.now()}.html`);
};

var saveBlob = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (blob, fileName) {
        var url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());