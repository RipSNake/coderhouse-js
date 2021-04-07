//import Producto from './Producto';
// Constructor Carro de Compras
/*export default*/	 
class Cart {
	constructor(usuario_id) {
		this.id = assignCartId();
		this.user_id = user_id;
		this.products = []; // lo ideal seria que este compuesto por { id_producto, cantidad }
		this.sold = false;
	}

	// ver id del carro
	getCartId() {
		return this.id;
	};
	// ver quien es el usuario dueño del carro
	getUser() {
		for(let user of userList) {
			if(user.id === this.user_id) {
				return user;
			}
		}
		// if the user id not found due to an error
		console.log('User not found');
	};
	// devuelve la cantidad total de productos en el carro
	productsQuantity() {
		return this.products.length;
	}
	// devuelve el precio total del carro
	getTotalPrice() {
		let total = 0;
		for(let prod of this.products) {
			total += prod.price;
		}
		return total;
	}
	// agrega un producto y la cantidad de unidades que queremos de ese producto
	addProduct(product,quantity) {
		if(this.sold){
			console.log('Cart already sold');
		} else {
			if(product.isAvailable()){
				this.products.push({product, quantity});	
			}
				console.log('Item not longer on sale');
		};
	};
	// Quitar producto del carro. Si ya se venció no se puede quitar
	removeProduct(product) {
		if(!this.sold) {
			for(let prod of this.products) {
				if(prod.id === product.id) {
					return this.products.splice(this.products.indexOf(prod),1);
				}
			}
		} else {
			console.log('Cart already Sold');
		}
		return null;
	}
	// vaciar los productos del carro
	emptyCart() {
		if(this.isSold) {
			console.log('Cart already sold. Cannot be edited.');
		} else {
			if(confirm('Are you sure that you want to clean out your Cart?')){
				while(this.products.length > 0) {
					this.products.pop();
				}
			}
		}
	};
	// informar si ya se vendio o no
	wasSold() {
		return this.sold;
	};
	// comprar el carro y todos sus productos
	buyCart() {
		if(!this.isSold) {
			this.isSold = true;
			console.log('Cart bought successfully');
		};
	};

};