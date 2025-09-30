// src/App.jsx
import React, { useEffect, Suspense } from 'react';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/header/Header.jsx';
import Footer from './components/footer/Footer.jsx';
//
// 무거운 페이지는 동적 로딩으로 초기 번들을 줄입니다.
const BoardListPage = React.lazy(() => import('./pages/BoardListPage/BoardListPage.jsx'));
const SignUpPage = React.lazy(() => import('./pages/auth/signup/SignUpPage.jsx'));
const LoginPage = React.lazy(() => import('./pages/auth/login/LoginPage.jsx'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage.jsx'));
const CounselPage = React.lazy(() => import('./pages/CounselPage/CounselPage.jsx'));
const ShopListPage = React.lazy(() => import('./pages/ShopListPage/ShopListPage.jsx'));
const OAuthCallbackPage = React.lazy(() => import('./pages/auth/oauth/OAuthCallbackPage.jsx'));
const PostDetail = React.lazy(() => import('./pages/PostDetail/PostDetail.jsx'));
const WritePage = React.lazy(() => import('./pages/WritePage/WritePage.jsx'));
const OverviewPage = React.lazy(() => import('./pages/OverviewPage/OverviewPage.jsx'));
const CompanyPage = React.lazy(() => import('./pages/OverviewPage/CompanyPage.jsx'));
const ActivityPage = React.lazy(() => import('./pages/OverviewPage/ActivityPage.jsx'));
const OverviewMapPage = React.lazy(() => import('./pages/OverviewMapPage/OverviewMapPage.jsx'));
const ProgramPage = React.lazy(() => import('./pages/ProgramPage/ProgramPage.jsx'));
const ProgramFlowPage = React.lazy(() => import('./pages/ProgramPage/ProgramFlowPage.jsx'));
const ProgramCurriculumPage = React.lazy(() => import('./pages/ProgramPage/ProgramCurriculumPage.jsx'));
const FranchisePage = React.lazy(() => import('./pages/FranchisePage/FranchisePage.jsx'));
const MyPage = React.lazy(() => import('./pages/MyPage/MyPage.jsx'));
const AdminDashboardPage = React.lazy(() => import('./pages/admin/AdminDashboardPage.jsx'));
const UsersManagementPage = React.lazy(() => import('./pages/admin/UsersManagementPage.jsx'));
const PostsManagementPage = React.lazy(() => import('./pages/admin/PostsManagementPage.jsx'));
import { globalStyles } from './styles/globalStyles.js';
import HomePage from './pages/HomePage/HomePage.jsx';
import AdminRoute from './components/AdminRoute.jsx';

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
        <Suspense fallback={<div style={{minHeight: '40vh', display:'flex',alignItems:'center',justifyContent:'center'}}>불러오는 중…</div>}>
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
          {/* 게시판 라우트 (관리자 전용) */}
          <Route path="/:section/write" element={<AdminRoute><WritePage /></AdminRoute>} />
          <Route path="/:section/edit/:postId" element={<AdminRoute><WritePage /></AdminRoute>} />
          <Route path="/:section/:key/:postId" element={<PostDetail />} />
          <Route path="/:section/:key" element={<BoardListPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </Suspense>
      </Main>
      <Footer />
    </>
  );
}
