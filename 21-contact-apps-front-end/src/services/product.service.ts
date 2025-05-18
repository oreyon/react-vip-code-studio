import axios from 'axios';
import api from './axios.service';

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
