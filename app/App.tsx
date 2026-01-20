import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import type { Product } from '@/features/product/types';
import { MOCK_PRODUCTS } from '@/features/product/mockData';
import { Home } from '@/features/home/pages/Home';
import { ProductDetailWrapper } from '@/features/product/pages/ProductDetailWrapper';
import { ProductWrite } from '@/features/product/pages/ProductWrite';
import { AIProductWrite } from '@/features/product/pages/AIProductWrite';
import { ChatDetail } from '@/features/chat/pages/ChatDetail';
import { ROUTES } from '@/shared/constants/routes';

import { LoginPage } from '@/features/auth/pages/LoginPage';
import { SignupPage } from '@/features/auth/pages/SignupPage';
import { AuthGuard } from '@/features/auth/components/AuthGuard';

const App: React.FC = () => {
  // Global Data State
  const [allProducts, setAllProducts] = useState<Product[]>(MOCK_PRODUCTS);

  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Home allProducts={allProducts} onNewProduct={() => { }} />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.SIGNUP} element={<SignupPage />} />

      <Route path={ROUTES.CHAT_DETAIL_PATTERN} element={
        <AuthGuard>
          <ChatDetail />
        </AuthGuard>
      } />
      <Route path={ROUTES.PRODUCT_DETAIL_PATTERN} element={<ProductDetailWrapper products={allProducts} />} />

      <Route path={ROUTES.PRODUCT_WRITE} element={
        <AuthGuard>
          <ProductWrite />
        </AuthGuard>
      } />
      <Route path={ROUTES.PRODUCT_WRITE_AI} element={
        <AuthGuard>
          <AIProductWrite />
        </AuthGuard>
      } />
    </Routes>
  );
};

export default App;
