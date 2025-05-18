import { AxiosResponse } from 'axios';
import { errorMessage } from './auth.service';
import api from './axios.service';

export type ContactData = {
	id?: number;
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	phone: string | null;
	image: string | null;
};

export type PagingData = {
	page: number;
	size: number;
	sortBy: string;
	orderBy: string;
};

export type SearchParams = {
	username: string; // No longer null, use string or empty string
	email: string; // No longer null, use string or empty string
	phone: string; // No longer null, use string or empty string
	page: number;
	size: number;
	sortBy: string;
	orderBy: string;
};

export const createContact = async (
	contactData: ContactData
): Promise<void> => {
	try {
		const response: AxiosResponse = await api.post('/contacts', contactData);
		if (response.status === 201) {
			console.log('Contact created successfully');
		}
	} catch (error: unknown) {
		errorMessage(error);
	}
};

export const getContacts = async (searchParams: SearchParams) => {
	try {
		const response: AxiosResponse = await api.get('/contacts', {
			params: searchParams,
		});

		// Return the full response object, including data and paging information
		return {
			data: response.data.data, // Contact data
			paging: response.data.paging, // Pagination details (current_page, total_page, etc.)
		};
	} catch (error: unknown) {
		errorMessage(error);
		return { data: [], paging: { current_page: 1, total_page: 1 } }; // Default return if there's an error
	}
};
