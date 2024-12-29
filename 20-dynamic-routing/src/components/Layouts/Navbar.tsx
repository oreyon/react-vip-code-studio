import {
	NavigationMenu,
	NavigationMenuIndicator,
	NavigationMenuList,
	NavigationMenuViewport,
} from '@/components/ui/navigation-menu';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Link } from 'react-router-dom';

import { useLogin } from '../../hooks/useLogin';
import { useLogout } from '../../hooks/useLogout';

const navigation = [
	{ name: 'Dashboard', href: '/dashboard' },
	{ name: 'Products', href: '/products' },
];

const profile = [
	{ name: 'Profile', href: '/profile' },
	{ name: 'Settings', href: '/settings' },
];

const Navbar = () => {
	const username = useLogin();
	const logout = useLogout();

	// const handleLogout = () => {
	// 	localStorage.removeItem('email');
	// 	localStorage.removeItem('password');
	// 	localStorage.removeItem('cart');
	// 	localStorage.removeItem('token');
	// 	onLogout();
	// 	navigate('/');
	// };

	return (
		<nav className='bg-blue-600 shadow'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<NavigationMenu>
							<NavigationMenuList>
								{navigation.map((item) => (
									<Link
										key={item.name}
										to={item.href}
										className='block rounded px-4 py-2 text-gray-100 hover:bg-gray-100 hover:text-slate-700'>
										{item.name}
									</Link>
								))}
							</NavigationMenuList>
							<NavigationMenuIndicator />
							<NavigationMenuViewport />
						</NavigationMenu>
					</div>
					<div className='flex items-center space-x-4'>
						<DropdownMenu>
							<DropdownMenuTrigger>
								{username && (
									<span className='text-white'>Welcome, {username}</span>
								)}
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>My Account</DropdownMenuLabel>
								<DropdownMenuSeparator />
								{profile.map((item) => (
									<DropdownMenuItem asChild key={item.name}>
										<Link
											to={item.href}
											className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>
											{item.name}
										</Link>
									</DropdownMenuItem>
								))}
								<DropdownMenuItem>
									<button
										type='button'
										onClick={logout}
										className='block w-full px-4 py-2 text-white bg-red-500 hover:bg-red-600'>
										Logout
									</button>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
