import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../src/contexts/AuthContext';

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user, router]);

  return <div>Loading...</div>;
};

export default Home;
