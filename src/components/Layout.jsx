import { Suspense } from 'react';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';
import Header from './Header/Header';

export const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      {isLoggedIn && <Header />}
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
