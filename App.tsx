import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Product } from './types';
import { MOCK_PRODUCTS } from './constants';
import { Home } from './components/Home';
import { ProductDetailWrapper } from './components/ProductDetailWrapper';
import { ProductWrite } from './components/ProductWrite';
import { AIProductWrite } from './components/AIProductWrite';
import { ChatDetail } from './components/ChatDetail';

const App: React.FC = () => {
  // Global Data State
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);

  return (
    <Routes>
      <Route path="/" element={<Home allProducts={allProducts} onNewProduct={() => { }} />} />
      <Route path="/chat/:id" element={<ChatDetail />} />
      <Route path="/product/:id" element={<ProductDetailWrapper products={allProducts} />} />
      <Route path="/write" element={<ProductWrite />} />
      <Route path="/write/ai" element={<AIProductWrite />} />
    </Routes>
  );
};

export default App;