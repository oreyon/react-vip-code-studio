import { Fragment } from 'react/jsx-runtime';
import CardProduct from '../components/Fragments/CardProduct.tsx';
import Button from '../components/Elements/Button/Button.tsx';
import { useEffect, useRef, useState } from 'react';
import { getProducts, Product } from '../services/product.service.ts';
import { useLogin } from '../hooks/useLogin.tsx';

export type Cart = Product & {
	quantity: number;
	total: number;
};

const ProductsPage = () => {
	const [cart, setCart] = useState<Cart[]>([]);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	// set initial data for total bill
	const totalBillRef = useRef<HTMLTableRowElement>(null);
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const username = useLogin();

	// listen data from endpoint
	useEffect(() => {
		setLoading(true);

		// manual fetch
		// fetchProducts()
		// 	.then((data: Product[]) => {
		// 		setProducts(data);
		// 	})
		// 	.catch((error) => console.error('Failed to fetch products:', error))
		// 	.finally(() => setLoading(false));

		// axios fetch
		getProducts()
			.then((data: Product[]) => {
				setProducts(data);
			})
			.catch((error) => console.error('Failed to fetch products:', error))
			.finally(() => setLoading(false));
	}, []);

	// Listening cart data from local storage
	useEffect(() => {
		setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
	}, []);

	// Listening the total price of the cart
	useEffect(() => {
		if (products.length > 0 && cart.length > 0) {
			// Calculate the total price of the cart
			const totalPrice = cart.reduce(
				(total: number, item: Cart) => total + item.total,
				0
			);
			setTotalPrice(totalPrice);

			// save cart to local storage
			localStorage.setItem('cart', JSON.stringify(cart));
		} else {
			setTotalPrice(0);
		}
	}, [cart, products]);

	// Show or hide the total bill row if data in the cart is empty
	useEffect(() => {
		if (totalBillRef.current) {
			if (cart.length > 0 && products.length > 0) {
				totalBillRef.current.style.display = 'table-row';
			} else {
				totalBillRef.current.style.display = 'none';
			}
		}
	}, [cart, products]);

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
		localStorage.removeItem('token');

		window.location.href = '/';
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen font-bold'>
				Loading ...
			</div>
		);
	}

	return (
		<Fragment>
			<div className='flex justify-end h-20 bg-blue-600 text-white items-center px-5'>
				{username}
				<Button classNameProps='ml-5 bg-red-500' onClick={handleLogout}>
					Logout
				</Button>
			</div>

			<div className='flex justify-center py-5'>
				<div className='w-4/6 flex flex-wrap'>
					{products.length > 0 &&
						products.map((product: Product) => (
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
								<th>Total Price</th>
							</tr>
						</thead>
						<tbody>
							{/* cart product */}
							{products.length > 0 &&
								cart.map((item: Cart) => (
									<tr key={item.id}>
										<td>{item.title}</td>
										<td>
											{item.price.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
												maximumFractionDigits: 0,
											})}
										</td>
										<td>{item.quantity}</td>
										<td>
											{item.total.toLocaleString('en-US', {
												style: 'currency',
												currency: 'USD',
												maximumFractionDigits: 0,
											})}
										</td>
									</tr>
								))}
							{/* cart total product */}

							<tr ref={totalBillRef}>
								<td colSpan={3} className='text-left font-bold'>
									{/* count total product form quantity item in cart */}
									Total Bill (
									{cart.reduce(
										(total: number, item: Cart) => total + item.quantity,
										0
									)}{' '}
									Products)
								</td>
								<td className='font-bold'>
									{totalPrice.toLocaleString('en-US', {
										style: 'currency',
										currency: 'USD',
										maximumFractionDigits: 0,
									})}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</Fragment>
	);
};
export default ProductsPage;
