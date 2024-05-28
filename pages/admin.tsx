import React, { useState } from 'react';
import Navbar from '../src/components/Navbar';
import axios from 'axios';
import { useAuth } from '../src/contexts/AuthContext';
import dynamic from 'next/dynamic';

const ProtectedRoute = dynamic(() => import('../src/components/ProtectedRoute'), { ssr: false });

const Admin = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://aci-logistics-shwapno-server.vercel.app/api/products', {
        name,
        description,
        price,
        image,
        userId: user?.uid
      });
      alert('Product added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add product');
    }
  };

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-2xl mb-4">Add Product</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Price</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Image URL</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border rounded w-full py-2 px-3 text-gray-700"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="btn btn-primary">Add Product</button>
            </div>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
