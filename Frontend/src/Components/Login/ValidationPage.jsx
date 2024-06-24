import React, { useEffect, useState } from 'react';
import { validateAccount } from './loginService';

const ValidationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState({
    loading: true,
    success: false,
    error: null
  });

  useEffect(() => {
    const validateToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        try {
          const response = await validateAccount(token);
          console.log('Validation response:', response);
          setVerificationStatus({
            loading: false,
            success: true,
            error: null
          });
        } catch (error) {
          console.error('Error validating account:', error);
          setVerificationStatus({
            loading: false,
            success: false,
            error: error.message || 'An error occurred while validating account'
          });
        }
      } else {
        console.error('Token not found in URL');
        setVerificationStatus({
          loading: false,
          success: false,
          error: 'Token not found in URL'
        });
      }
    };

    validateToken();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-700">
      <div className='flex flex-wrap justify-center mb-4'>
        <img src={import.meta.env.VITE_TOURNAMENT_IMAGE_API} alt='Uefa' className="w-84 h-64 mt-14"/>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-3xl font-bold mb-4">Account Verification</h2>
        {verificationStatus.loading && <p>Loading...</p>}
        {!verificationStatus.loading && verificationStatus.success && (
          <p className="flex items-center text-lg mb-2 font-bold text-black bg-opacity-75 rounded-md"
             style={{ textShadow: '0 0 10px white' }}>
            Your account has been successfully verified!
          </p>
        )}
        {!verificationStatus.loading && !verificationStatus.success && (
          <p className="flex items-center text-lg mb-2 font-bold text-red-500 bg-opacity-75 rounded-md"
             style={{ textShadow: '0 0 10px white' }}>
            {verificationStatus.error}
          </p>
        )}
        <a href="/login" className="flex items-center text-lg mb-2 font-bold text-black bg-opacity-75 rounded-md hover:text-yellow-500"
            style={{ textShadow: '0 0 10px white' }}>
          Back to Login
        </a>
      </div>
    </div>
  );
};

export default ValidationPage;
