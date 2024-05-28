import React from 'react';
import { Product } from '../types';
import Image from 'next/image';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <Image src={product.image} alt={product.name} width={150} height={150} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">${product.price}</button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
