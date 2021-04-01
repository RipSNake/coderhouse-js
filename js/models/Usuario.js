require('Carro');

class Usuario {
	constructor(nombre,email,password) {
		this.id = asignarIdUsuario();
		this.nombre = nombre;
		this.email = email;
		this.password = password;
		this.carros = [];
		this.activo = true;
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

	validarClave(password) {
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
		if(!hayCarroActivo()) {
			let carroNuevo = new Carro(this.id);
			this.carros.push(carroNuevo);
		} else {
			console.log('Aun hay un carro sin vender');
		}
	};
	// ver carro activo
	getCarroActivo() {
		for(let c of carros) {
			if(!c.yaSeVendio) {
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
		if(carros.length > 0) {
			for(let c of this.carros) {
				if(!c.yaSeVendio) {
					return true;
				};
			};
		};
		// si no hay carros o ya fueron todos comprados
		return false;
	};
};