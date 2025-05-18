import Navbar from '../components/Layouts/Navbar';
import { Button } from '../components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../components/ui/card';
import useLogin from "@/hooks/useLogin.tsx";
import useLogout from "@/hooks/useLogout.tsx";


const ProfilePage = () => {
	const username = useLogin();
	const logout = useLogout();

	return (
		<div>
			<Navbar />
			<div className='flex justify-center items-center min-h-screen bg-gray-50 p-5'>
				<Card className='max-w-md w-full shadow-lg'>
					<CardHeader>
						<CardTitle className='text-blue-600'>User Profile</CardTitle>
						<CardDescription>
							Manage your profile and account settings
						</CardDescription>
					</CardHeader>
					<CardContent className='space-y-4'>
						<div>
							<p className='text-gray-700 font-medium'>
								Username: <span>{username || 'Guest'}</span>
							</p>
						</div>
						<Button variant='destructive' onClick={logout}>
							Logout
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default ProfilePage;
