// src/App.jsx
import React, { useEffect } from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
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
import { globalStyles } from './styles/globalStyles.js';
import HomePage from './pages/HomePage/HomePage.jsx';
import OverviewPage from './pages/OverviewPage/OverviewPage.jsx';
import CompanyPage from './pages/OverviewPage/CompanyPage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx';
import UsersManagementPage from './pages/admin/UsersManagementPage.jsx';
import PostsManagementPage from './pages/admin/PostsManagementPage.jsx';
import ActivityPage from './pages/OverviewPage/ActivityPage.jsx';
import ProgramPage from './pages/ProgramPage/ProgramPage.jsx';
import ProgramFlowPage from './pages/ProgramPage/ProgramFlowPage.jsx';
import ProgramCurriculumPage from './pages/ProgramPage/ProgramCurriculumPage.jsx';
import FranchisePage from './pages/FranchisePage/FranchisePage.jsx';
import MyPage from './pages/MyPage/MyPage.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';

const Main = styled.main`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
`;

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  return (
    <>
      <Global styles={globalStyles} />
      <Header
        currentPath={location.pathname}
        onNavigate={(href) => navigate(href)}
        sticky
        showTagline
      />
      <Main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/overview/company" element={<CompanyPage />} />
          <Route path="/overview/activity" element={<ActivityPage />} />
          <Route path="/overview/map" element={<OverviewMapPage />} />
          <Route path="/program" element={<ProgramPage />} />
          <Route path="/program/flow" element={<ProgramFlowPage />} />
          <Route path="/program/curriculum" element={<ProgramCurriculumPage />} />
          <Route path="/franchise" element={<FranchisePage />} />
          <Route path="/shop/list" element={<ShopListPage />} />
          <Route path="/counsel" element={<CounselPage />} />
          <Route path="/oauth2/callback" element={<OAuthCallbackPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/mypage" element={<MyPage />} />
          {/* 관리자 라우트 */}
          <Route path="/admin" element={<AdminRoute><AdminDashboardPage /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><UsersManagementPage /></AdminRoute>} />
          <Route path="/admin/posts" element={<AdminRoute><PostsManagementPage /></AdminRoute>} />
          {/* 게시판 라우트 */}
          <Route path="/:section/write" element={<WritePage />} />
          <Route path="/:section/edit/:postId" element={<WritePage />} />
          <Route path="/:section/:key/:postId" element={<PostDetail />} />
          <Route path="/:section/:key" element={<BoardListPage />} />
        </Routes>
      </Main>
      <Footer />
    </>
  );
}
