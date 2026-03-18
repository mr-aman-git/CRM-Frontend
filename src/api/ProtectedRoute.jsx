import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check karein ki kya token 'loginToken' naam se hi save hai?
  const token = localStorage.getItem('loginToken');
  const location = useLocation();

  if (!token) {
    // Agar token nahi hai, tabhi login pe bhejo
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Agar token hai, toh jo manga hai wo dikhao (children)
  return children;
};

export default ProtectedRoute;