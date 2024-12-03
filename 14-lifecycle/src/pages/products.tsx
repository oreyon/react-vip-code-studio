import { Fragment } from 'react/jsx-runtime';
import CardProduct from '../components/Fragments/CardProduct.tsx';
import Button from '../components/Elements/Button/Button.tsx';
import { useState } from 'react';
import Counter from '../components/Fragments/Counter.tsx';

export type Product = {
	id: number;
	title: string;
	price: number;
	image: string;
	description: string;
};

export type Cart = Product & {
	quantity: number;
	total: number;
};

const products: Product[] = [
	{
		id: 1,
		title: 'Wuthering Heights',
		price: 1000000,
		image: '/images/book-1.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?',
	},
	{
		id: 2,
		title: 'Jane Eyre',
		price: 500000,
		image: '/images/book-2.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?',
	},
	{
		id: 3,
		title: 'The Picture of Dorian Gray',
		price: 300000,
		image: '/images/book-3.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?',
	},
	{
		id: 4,
		title: 'The Great Gatsby',
		price: 250000,
		image: '/images/book-4.jpg',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque inventore laudantium magnam minus obcaecati voluptatem? Commodi nesciunt quia vel. Doloribus?',
	},
];

const emailLogin = localStorage.getItem('email');

const ProductsPage = () => {
	const [cart, setCart] = useState<Cart[]>([]);

	const handleAddToCart = (product: Product) => {
		const existingProduct = cart.find((item: Cart) => item.id === product.id);

		if (existingProduct) {
			// Update the quantity and total for an existing item
			setCart(
				cart.map(
					(item: Cart): Cart =>
						item.id === product.id
							? {
									...item,
									quantity: item.quantity + 1,
									total: item.total + product.price,
							  }
							: item
				)
			);
		} else {
			// Add a new item to the cart
			setCart([
				...cart,
				{
					...product,
					quantity: 1,
					total: product.price,
				},
			]);
		}
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
				<div className='w-4/6 flex flex-wrap'>
					{products.map((product: Product) => (
						<CardProduct key={product.id}>
							<CardProduct.Header
								hrefProps={'#'}
								srcProps={product.image}
								altProps={product.title}
							/>
							<CardProduct.Body titleProps={product.title}>
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
							{cart.map((item: Cart) => (
								<tr key={item.id}>
									<td>{item.title}</td>
									<td>
										{item.price.toLocaleString('id-ID', {
											style: 'currency',
											currency: 'IDR',
											maximumFractionDigits: 0,
										})}
									</td>
									<td>{item.quantity}</td>
									<td>
										{item.total.toLocaleString('id-ID', {
											style: 'currency',
											currency: 'IDR',
											maximumFractionDigits: 0,
										})}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<div className='flex justify-center mt-5 mb-5'>
				<Counter></Counter>
			</div>
		</Fragment>
	);
};
export default ProductsPage;
