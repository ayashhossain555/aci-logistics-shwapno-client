import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/AuthContext';
import LoadingSpinner from '../src/components/LoadingSpinner';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = event.currentTarget.elements as typeof event.currentTarget.elements & {
      email: HTMLInputElement;
      password: HTMLInputElement;
    };
    try {
      await login(email.value, password.value);
    } catch (error) {
      alert('Failed to login');
    }
  };

  if (!isClient) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
