// src/context/auth.context.tsx
import { createContext } from 'react';
import type { User } from '../types/Auth';

interface AuthContextType {
	user: User | null;
	logout: () => void;
	isCheckingSession: boolean;
	isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
