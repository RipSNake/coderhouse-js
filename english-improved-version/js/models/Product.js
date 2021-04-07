// importar ASIGNAR ID PRODUCTO // 

// Constructor de Productos
class Product {
	constructor(name,trademark,price) {
		this.id = assignProductId();
		this.name = name;
		this.trademark = trademark;
		this.price = price;
		this.available = true;
	}

	getProducto() {
		return this;
	};

	getProductId() {
		return this.id;
	};

	changePrice(precio) {
		this.price = price;
	};

	isAvailable() {
		return this.available;
	};

	changeAvailability() {
		if(this.available) {
			this.available = false;
		} else {
			this.available = true;
		};
	};
};

