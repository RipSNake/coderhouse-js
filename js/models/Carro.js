import Producto from './Producto';
// Constructor Carro de Compras
export default class Cart {
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
		for(let prod of productos) {
			prod.verProducto();
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
		if(this.yaSeVendio){
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
		if(!this.yaSeVendio) {
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
		if(this.yaSeVendio) {
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
		if(!this.yaSeVendio) {
			this.yaSeVendio = true;
			console.log('Carro Comprado Correctamente');
		};
	};

};