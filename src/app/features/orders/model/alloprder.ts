
export interface Alloprder {
	details: string;
	phone: string;
	city: string;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	phone: string;
}

export interface Subcategory {
	_id: string;
	name: string;
	slug: string;
	category: string;
}

export interface Category {
	_id: string;
	name: string;
	slug: string;
	image: string;
}

export interface Brand {
	_id: string;
	name: string;
	slug: string;
	image: string;
}

export interface Product {
	subcategory: Subcategory[];
	ratingsQuantity: number;
	_id: string;
	title: string;
	imageCover: string;
	category: Category;
	brand: Brand;
	ratingsAverage: number;
	id: string;
}

export interface CartItem {
	count: number;
	product: Product;
	price: number;
	_id: string;
}

export interface RootObject {
	shippingAddress: Alloprder;
	taxPrice: number;
	shippingPrice: number;
	totalOrderPrice: number;
	paymentMethodType: string;
	isPaid: boolean;
	isDelivered: boolean;
	_id: string;
	user: User;
	cartItems: CartItem[];
	createdAt: string;
	updatedAt: string;
	id: number;
	__v: number;
}