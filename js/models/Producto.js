// importar ASIGNAR ID PRODUCTO // 

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

module.exports = Producto;