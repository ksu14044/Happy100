// src/App.jsx
import React from 'react';
import { Global, css } from '@emotion/react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
import NewsPage from './pages/NewsPage/NewsPage.jsx';

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
        <Route path="/overview/news" element={<NewsPage/>} />
      </Routes>
      <Footer />
    </>
  );
}
