import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const validateToken = async (token) => {
  try {
    const response = await axios.post(import.meta.env.VITE_VALIDATE_TOKEN, { token });
    return response.data.success;
  } catch (error) {
    return false;
  }
};

const PrivateRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const valid = await validateToken(token);
        if (valid) {
          setIsValid(true);
        } else {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          setIsValid(false);
        }
      } else {
        setIsValid(false);
      }
    };

    checkToken();
  }, [token]);

  if (isValid === null) {
    return <div>Loading...</div>;
  }

  return isValid ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
