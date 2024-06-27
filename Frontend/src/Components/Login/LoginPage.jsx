import { useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';

function LoginPage() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="min-h-screen flex-wrap flex flex-row items-center justify-center bg-blue-700">
      <div className='hidden md:flex flex-wrap justify-center'>
        <img src={'https://editorial.uefa.com/resources/028c-1aac3485461a-a2ee48622217-1000/format/wide1/euro_wtw.jpeg?imwidth=988'} alt='Uefa' className="w-84 h-64 mt-14"/>
      </div>  
      <div className="bg-white p-8 mt-14 mr-2 ml-2 rounded-xl shadow-md w-96">
        {isRegistering ? <RegisterForm /> : <LoginForm />}
        <div className="mt-4 text-center">
          <button
            className="text-blue-500 hover:underline"
            onClick={toggleForm}
          >
            {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
