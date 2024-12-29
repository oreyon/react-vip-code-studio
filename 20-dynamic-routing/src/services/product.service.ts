import axios from 'axios';

export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	image: string;
	category: string;
	rating: {
		rate: number;
		count: number;
	};
};

const baseURL = 'https://fakestoreapi.com';

export const api = axios.create({
	baseURL: `${baseURL}`,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: false,
});

// using manual fetch
const api2 = async (
	endpoint: string,
	options: RequestInit = {}
): Promise<Response> => {
	const { headers, ...rest } = options;
	return fetch(`${baseURL}${endpoint}`, {
		headers: {
			'Content-Type': 'application/json',
			...headers, // Merge additional headers
		},
		...rest, // Spread the rest of the options like method, body, etc.
	});
};

export const fetchProducts = async (): Promise<Product[]> => {
	try {
		const response = await api2('/products'); // Using custom fetch wrapper
		if (!response.ok) {
			throw new Error(`Failed to fetch products: ${response.statusText}`);
		}
		const data = (await response.json()) as Product[];
		return data;
	} catch (error) {
		console.error('Error fetching products:', error);
		throw error;
	}
};

export const getProducts = async (): Promise<Product[]> => {
	try {
		const response = await api.get<Product[]>('/products');
		if (response.status !== 200) {
			throw new Error(`Failed to fetch products: ${response.statusText}`);
		}
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Failed to fetch products: ${error.message}`);
		} else {
			console.log('Unexpected error:', error);
		}
		throw error;
	}
};

export const getDetailProduct = async (id: number) => {
	try {
		const response = await api.get<Product>(`/products/${id}`);
		if (response.status !== 200) {
			throw new Error(`Failed to fetch product: ${response.statusText}`);
		}
		return response.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			throw new Error(`Failed to fetch product: ${error.message}`);
		} else {
			console.log('Unexpected error:', error);
		}
		throw error;
	}
};
