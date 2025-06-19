import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ArticleDetail from './pages/ArticleDetail'
import LoginPage from './pages/LoginPage'
import ArticleManager from './pages/ArticleManager'
import ArticleForm from './pages/ArticleForm'
import Dashboard from './pages/Editor/Dashboard'
import MainLayout from './layouts/MainLayout'
import AccountPage from './pages/AccountPage'
import SubLayout from './layouts/SubLayout'
import PrivateRoute from './components/PrivateRoute'
import { useEffect } from 'react'
import ScrollToTop from './components/ScrollToTop'
import CategoryPage from './pages/CategoryPage'

function App() {

  console.log("testing 5");
  
  return (
    <>
      <ScrollToTop/>
      <Routes>
        {/* Layout chính cho người dùng */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/:category"
          element={
            <MainLayout>
              <CategoryPage/>
            </MainLayout>
          }
        />
        <Route
          path="/article/:slug"
          element={
            <MainLayout>
              <ArticleDetail/>
            </MainLayout>
          }
        />
        <Route
          path="/account/"
          element={
            <PrivateRoute>
              <SubLayout>
                <AccountPage/>
              </SubLayout>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/articles" element={<PrivateRoute><SubLayout><ArticleManager /></SubLayout></PrivateRoute>} />
        <Route path="/articles/new" element={<PrivateRoute><ArticleForm /></PrivateRoute>} />
        <Route path="/articles/edit/:id" element={<PrivateRoute><ArticleForm /></PrivateRoute>} />
      </Routes>
    </>
  )
}

export default App
