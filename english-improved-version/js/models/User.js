// import Carro from './Carro';

/*export default*/ 
class User {
	constructor(name,email,password) {
		this.id = assignUserId();
		this.name = name;
		this.email = email;
		this.password = password;
		this.carts = []; // array to save all the carts that had been bought and the one active for the user
		this.active = true;
	}

	getId() {
		return this.id;
	};

	validatePassword(password) {
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
					return true;	
				} else {
					console.log('Wrong password: It must have at least one UPPERCASE character');
				};
			} else { 
				console.log('Wrong password: It must have at least one Number');
				return false;
			};
		} else { // si no cumple con la longitud retorna false
			console.log('The selected password is too short');
			return false;
		};
	};

	isActive() {
		return this.activo;
	};

	activateUser() {
		if(!isActive()) {
			this.active = true;
			console.log('User '+this.email+' Activated');
		} else {
			console.log('The User '+this.email+' is already Active');
		}
	}

	deacivate() {
		if(isActive()) {
			this.active = false;
			console.log('User '+this.email+' deactivated');
		} else {
			console.log('The User '+this.email+' is already deactivated');
		}
	};
	// genera un nuevo carro de compras
	createCart() {
		if(!hasActiveCart()) {
			let newCart = new Cart(this.id);
			this.carts.push(newCart);
		} else {
			console.log('There\'s still an active cart');
		}
	};
	// ver carro activo
	getActiveCart() {
		for(let c of this.carts) {
			if(!c.wasSold()) {
				return c;
			};
		};
		// si no encuentra ningún carro activo llega hasta acá crea un nuevo carro
		createCart()
	};
	// confirmar compra del carro
	buyCart() {
		cart = this.getActiveCart();
		text = 'Está seguro de que desea comprar el carro con un total de '+cart.productsQuantity()+' productos por un total de '+cart.getTotalPrice()+' ?';
		if(confirm(text)) {
			cart.buyCart();
		} else {
			console.log('Compra del carro Cancelada');
		};
	};
	// vaciar carro
	emptyCart() {
		this.getCarroActivo().vaciarCarro();
	};
	// verifica si hay algún carro activo que aún no se haya comprado
	hasActiveCart() {
		if(this.carts.length > 0) {
			for(let c of this.carts) {
				if(!c.wasSold()) {
					return true;
				};
			};
		};
		// si no hay carros o ya fueron todos comprados
		return false;
	};
};