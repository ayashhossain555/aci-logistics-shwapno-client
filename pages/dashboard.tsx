import React, { useEffect, useState } from 'react';
import Navbar from '../src/components/Navbar';
import axios from 'axios';
import ProductCard from '../src/components/ProductCard';
import { Product } from '../src/types';
import { useAuth } from '../src/contexts/AuthContext';
import dynamic from 'next/dynamic';

const ProtectedRoute = dynamic(() => import('../src/components/ProtectedRoute'), { ssr: false });

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      axios.get('https://aci-logistics-shwapno-server.vercel.app/api/products')
        .then(response => setProducts(response.data))
        .catch(error => console.error(error));
    }
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <Navbar />
        <div className="p-4">
          <h1 className="text-4xl mb-4">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
