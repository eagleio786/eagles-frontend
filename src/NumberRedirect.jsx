import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NumberRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const routePattern = /\d/;

  React.useEffect(() => {
    if (routePattern.test(location.pathname)) {
      navigate(`/redirect?route=${encodeURIComponent(location.pathname)}`);
    }
  }, [location, navigate, routePattern]);

  return null;
};

export default NumberRedirect;
