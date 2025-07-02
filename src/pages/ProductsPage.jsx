// pages/ProductsPage.jsx
import React from 'react';
import ProductManagement from '../components/ProductManagement';
import useFetch from '../hooks/useFetch';

const ProductsPage = () => {
  // Mock product data
  const products = Array(15).fill().map((_, i) => ({
    id: `P${3000 + i}`,
    name: `Product ${i + 1}`,
    creator: `creator_${Math.floor(i / 3) + 1}`,
    price: (Math.random() * 100 + 10).toFixed(2),
    stock: Math.floor(Math.random() * 100),
    status: ['approved', 'pending', 'rejected'][Math.floor(Math.random() * 3)],
    image: `https://picsum.photos/200/200?random=${i}`
  }));

  return <ProductManagement products={products} />;
};

export default ProductsPage;