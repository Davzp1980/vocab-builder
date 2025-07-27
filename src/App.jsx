import { useMediaQuery } from 'react-responsive';
import './App.css';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import { Layout } from './components/Layout';
import { Route, Routes } from 'react-router';
import { RestrictedRoute } from './components/RestrictedRoute';
import { PrivateRoute } from './components/PrivateRouter';
import { Toaster } from 'react-hot-toast';
import DictionaryPage from './pages/DictionaryPage/DictionaryPage';

import Header from './components/Header/Header';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { refreshUser } from './redux/auth/operations';
import { getWordsCategories } from './redux/dictionary/operations';

function App() {
  const isTabletScreen = useMediaQuery({ query: '(min-width: 767px)' });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
    dispatch(getWordsCategories());
  }, [dispatch]);

  return (
    <>
      <main>
        <div className="main-container">
          <Layout>
            <Routes>
              <Route
                path="/register"
                element={
                  <RestrictedRoute
                    redirectTo="/dictionary"
                    component={<RegisterPage />}
                  />
                }
              />

              <Route
                path="/login"
                element={
                  <RestrictedRoute
                    redirectTo="/dictionary"
                    component={<LoginPage />}
                  />
                }
              />

              <Route
                path="/dictionary"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<DictionaryPage />}
                  />
                }
              />
              <Route
                path="/"
                element={
                  <PrivateRoute
                    redirectTo="/login"
                    component={<DictionaryPage />}
                  />
                }
              />
            </Routes>
          </Layout>

          {isTabletScreen && (
            <div className="backIMG">
              <img src="/img/background.webp" alt="" />
            </div>
          )}
        </div>
        <Toaster />
      </main>
      <Toaster />
    </>
  );
}

export default App;
