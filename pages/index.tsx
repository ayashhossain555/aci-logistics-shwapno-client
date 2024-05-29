import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Welcome to ACI Logistics Shwapno</h1>
      <button onClick={() => router.push('/login')}>Login</button>
      <button onClick={() => router.push('/register')}>Register</button>
    </div>
  );
};

export default Home;
