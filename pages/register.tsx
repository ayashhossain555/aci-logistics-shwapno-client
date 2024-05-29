import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/AuthContext';
import LoadingSpinner from '../src/components/LoadingSpinner';

const Register: React.FC = () => {
  const { register } = useAuth();
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
      await register(email.value, password.value);
    } catch (error) {
      alert('Failed to register');
    }
  };

  if (!isClient) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input name="email" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input name="password" type="password" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
