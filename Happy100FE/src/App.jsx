// src/App.jsx
import React from 'react';
import { Global, css } from '@emotion/react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import BoardListPage from './pages/BoardListPage/BoardListPage.jsx';
import SignUpPage from './pages/auth/signup/SignUpPage.jsx';
import WritePage from './pages/WritePage/WritePage.jsx';
import PostDetail from './pages/PostDetail/PostDetail.jsx';
import LoginPage from './pages/auth/login/LoginPage.jsx';
import OAuthCallbackPage from './pages/auth/oauth/OAuthCallbackPage.jsx';
import CounselPage from './pages/CounselPage/CounselPage.jsx';
import ShopListPage from './pages/ShopListPage/ShopListPage.jsx';
import OverviewMapPage from './pages/OverviewMapPage/OverviewMapPage.jsx';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Global
        styles={css`
          html, body, #root { height: 100%; margin: 0; padding: 0; }
          #root { width: 100% !important; }
          body { background: #fff; color: #111827; }
          a { color: inherit; }
        `}
      />
      <Header
        currentPath={location.pathname}
        onNavigate={(href) => navigate(href)}
        sticky
        showTagline
      />
      <Routes>
        <Route path="/oauth2/callback" element={<OAuthCallbackPage />} />
        <Route path="/counsel" element={<CounselPage />} />
        <Route path="/shop/list" element={<ShopListPage />} />
        <Route path="/overview/map" element={<OverviewMapPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/:section/write" element={<WritePage />} />
        <Route path="/:section/:key/:postId" element={<PostDetail />} />
        <Route path="/:section/:key" element={<BoardListPage />} />
      </Routes>
      <Footer />
    </>
  );
}
