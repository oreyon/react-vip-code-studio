import React, { useEffect, useState, useCallback } from 'react';
import {
	getContacts,
	ContactData,
	SearchParams,
} from '../services/contact.service';

const ContactsPage = () => {
	const [contacts, setContacts] = useState<ContactData[]>([]);
	const [searchParams, setSearchParams] = useState<SearchParams>({
		username: '',
		email: '',
		phone: '',
		page: 1,
		size: 10,
		sortBy: 'id',
		orderBy: 'asc',
	});

	const [totalPages, setTotalPages] = useState<number>(1); // State to track total pages
	const [currentPage, setCurrentPage] = useState<number>(1); // Track current page

	// Filter out empty/null search params before sending to the API
	const prepareSearchParams = (params: SearchParams): SearchParams => {
		const filteredParams: SearchParams = { ...params };
		Object.keys(filteredParams).forEach((key) => {
			const value = filteredParams[key as keyof SearchParams];
			if (value === '' || value === null || value === undefined) {
				delete filteredParams[key as keyof SearchParams];
			}
		});
		return filteredParams;
	};

	// Fetch contacts from the API
	const handleSearch = useCallback(async () => {
		const filteredParams = prepareSearchParams(searchParams);
		const data = await getContacts(filteredParams);

		if (data) {
			setContacts(data.data); // Assuming the response contains the 'data' array of contacts
			setTotalPages(data.paging.total_page); // Set total pages from the 'paging' object
			setCurrentPage(data.paging.current_page); // Set the current page from the 'paging' object
		}
	}, [searchParams]);

	// Trigger search when searchParams change
	useEffect(() => {
		handleSearch();
	}, [searchParams, handleSearch]);

	// Handle input change for the search fields
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setSearchParams((prevParams) => ({
			...prevParams,
			[name]: value,
		}));
	};

	// Handle page change (next/previous)
	const handlePageChange = (direction: 'next' | 'previous') => {
		setSearchParams((prevParams) => {
			const newPage =
				direction === 'next' ? prevParams.page + 1 : prevParams.page - 1;
			return { ...prevParams, page: newPage };
		});
	};

	return (
		<div>
			<h1>Search Contacts</h1>
			<div>
				<input
					type='text'
					name='username'
					value={searchParams.username || ''}
					onChange={handleInputChange}
					placeholder='Search by Username'
				/>
				<input
					type='email'
					name='email'
					value={searchParams.email || ''}
					onChange={handleInputChange}
					placeholder='Search by Email'
				/>
				<input
					type='text'
					name='phone'
					value={searchParams.phone || ''}
					onChange={handleInputChange}
					placeholder='Search by Phone'
				/>
				<button onClick={handleSearch}>Search</button>
			</div>

			<h2>Contacts</h2>
			<ul>
				{contacts.map((contact) => (
					<li key={contact.id}>
						<p>
							{contact.firstName} {contact.lastName}
						</p>
						<p>{contact.email}</p>
						<p>{contact.phone}</p>
					</li>
				))}
			</ul>

			<div>
				<button
					onClick={() => handlePageChange('previous')}
					disabled={currentPage <= 1}>
					Previous
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button
					onClick={() => handlePageChange('next')}
					disabled={currentPage >= totalPages}>
					Next
				</button>
			</div>
		</div>
	);
};

export default ContactsPage;
