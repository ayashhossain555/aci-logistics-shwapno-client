import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/AuthContext';
import Navbar from '../src/components/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to log in:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl mb-4">Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="flex items-center justify-between">
            <button className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
