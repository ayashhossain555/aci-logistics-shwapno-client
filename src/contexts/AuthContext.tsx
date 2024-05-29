import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';

interface AuthContextProps {
  user: any;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      const decodedUser = jwt_decode(token);
      setUser(decodedUser); // Decoding the JWT token to get user info
      router.push('/dashboard');
    } catch (error) {
      Swal.fire('Error', 'Failed to login', 'error');
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setUser(null);
      router.push('/');
    } catch (error) {
      Swal.fire('Error', 'Failed to logout', 'error');
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const token = await user.getIdToken();
      localStorage.setItem('token', token);
      const decodedUser = jwt_decode(token);
      setUser(decodedUser); // Decoding the JWT token to get user info
      router.push('/dashboard');
    } catch (error) {
      Swal.fire('Error', 'Failed to register', 'error');
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          localStorage.setItem('token', token);
          const decodedUser = jwt_decode(token);
          setUser(decodedUser);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
