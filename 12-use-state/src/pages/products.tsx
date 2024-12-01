import { Fragment } from 'react/jsx-runtime';
import CardProduct from '../components/Fragments/CardProduct.tsx';
import Button from '../components/Elements/Button/Button.tsx';
import { useState } from 'react';

export type Product = {
	id: number;
	name: string;
	price: number;
	image: string;
	description: string;
};

const products: Product[] = [
	{
		id: 1,
		name: 'Wuthering Heights',
		price: 1000000,
		image: '/images/book-1.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?',
	},
	{
		id: 2,
		name: 'Jane Eyre',
		price: 2000000,
		image: '/images/book-2.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?',
	},
	{
		id: 3,
		name: 'The Picture of Dorian Gray',
		price: 3000000,
		image: '/images/book-3.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?',
	},
	{
		id: 4,
		name: 'The Great Gatsby',
		price: 4000000,
		image: '/images/book-4.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?',
	},
];

const emailLogin = localStorage.getItem('email');

const ProductsPage = () => {
	type CartItem = {
		id: number;
		name: string;
		quantity: number;
		price: number;
	};

	const [cart, setCart] = useState<CartItem[]>([]);

	const handleAddToCart = (product: Product) => {
		setCart((prevCart) => {
			// Check if the product already exists in the cart
			const existingProduct = prevCart.find((item) => item.id === product.id);

			// If it exists, update the quantity
			if (existingProduct) {
				return prevCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
			}

			// If it doesn't exist, add it to the cart
			return [
				...prevCart,
				{
					id: product.id,
					name: product.name,
					quantity: 1,
					price: product.price,
				},
			];
		});
	};

	const handleLogout = () => {
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		window.location.href = '/';
	};

	return (
		<Fragment>
			<div className='flex justify-end h-20 bg-blue-600 text-white items-center px-5'>
				{emailLogin}
				<Button classNameProps='ml-5 bg-red-500' onClick={handleLogout}>
					Logout
				</Button>
			</div>
			<div className='flex justify-center py-5'>
				<div className='flex flex-wrap w-4/6'>
					{products.map((product) => (
						<CardProduct key={product.id}>
							<CardProduct.Header
								hrefProps={'#'}
								srcProps={product.image}
								altProps={product.name}
							/>
							<CardProduct.Body titleProps={product.name}>
								{product.description}
							</CardProduct.Body>
							<CardProduct.Footer
								idProps={product.id}
								priceProps={product.price}
								addToCartProps={() => handleAddToCart(product)}
							/>
						</CardProduct>
					))}
				</div>
				<div className='w-2/6'>
					<h1 className='text-3xl font-bold text-blue-600 ml-5 mb-2'>Cart</h1>
					<table className='text-left table-auto border-separate border-spacing-x-5'>
						<thead>
							<tr>
								<th>Product</th>
								<th>Price</th>
								<th>Quantity</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((item) => {
								const product = products.find(
									(product) => product.id === item.id
								);
								return (
									<tr key={item.id}>
										<td>{product?.name}</td>
										<td>Rp {product?.price.toLocaleString('id-ID')}</td>
										<td>{item.quantity}</td>
										<td>
											Rp{' '}
											{(item.quantity * product!.price).toLocaleString('id-ID')}
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</div>
		</Fragment>
	);
};
export default ProductsPage;
