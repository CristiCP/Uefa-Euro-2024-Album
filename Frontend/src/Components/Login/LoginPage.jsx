import React, { useState } from 'react';

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

function LoginForm() {
  return (
    <div>
      <h2 className="text-2xl rounded-2xl font-bold mb-4">Login</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <div className="flex items-center justify-center mt-4">
        <div className="border-t w-full"></div>
        <span className="mx-4 text-gray-500">OR</span>
        <div className="border-t w-full"></div>
      </div>
      <div className="mt-4">
        <button className="w-full bg-gray-100 text-black py-2 mb-4 rounded flex items-center justify-center hover:bg-gray-200">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.9 0 7 1.5 9.4 3.9l6.9-6.9C35.5 3.5 30.1 1 24 1 14.8 1 7.4 6.7 4.1 14.4l7.8 6.1C13.6 14.2 18.3 9.5 24 9.5z"></path>
            <path fill="#34A853" d="M24 46c5.7 0 10.5-2 14.1-5.3l-6.9-5.6c-2 1.4-4.7 2.3-7.2 2.3-5.5 0-10.1-3.7-11.8-8.7l-7.8 6.1C6.5 41.3 14.8 46 24 46z"></path>
            <path fill="#4A90E2" d="M46.5 24.5c0-1.5-.1-2.9-.4-4.3H24v8.1h12.8c-.6 3-2.3 5.4-4.7 7.1l7.8 6.1C44.4 37.9 46.5 31.6 46.5 24.5z"></path>
            <path fill="#FBBC05" d="M12.3 29.4c-1.4-3.1-1.4-6.7 0-9.8l-7.8-6.1C2 18.8 1 21.9 1 24.5s1 5.7 3.5 10.9l7.8-6z"></path>
          </svg>
          Sign in with Google
        </button>
        <button className="w-full bg-blue-800 text-white py-2 rounded mt-2 flex items-center justify-center hover:bg-blue-900">
        <svg className='w-5 h-5 mr-2' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
            <linearGradient id="Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1" x1="9.993" x2="40.615" y1="9.993" y2="40.615" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#2aa4f4"></stop><stop offset="1" stop-color="#007ad9"></stop></linearGradient><path fill="url(#Ld6sqrtcxMyckEl6xeDdMa_uLWV5A9vXIPu_gr1)" d="M24,4C12.954,4,4,12.954,4,24s8.954,20,20,20s20-8.954,20-20S35.046,4,24,4z"></path><path fill="#fff" d="M26.707,29.301h5.176l0.813-5.258h-5.989v-2.874c0-2.184,0.714-4.121,2.757-4.121h3.283V12.46 c-0.577-0.078-1.797-0.248-4.102-0.248c-4.814,0-7.636,2.542-7.636,8.334v3.498H16.06v5.258h4.948v14.452 C21.988,43.9,22.981,44,24,44c0.921,0,1.82-0.084,2.707-0.204V29.301z"></path>
        </svg>
          Sign in with Facebook
        </button>
      </div>
    </div>
  );
}

function RegisterForm() {
  return (
    <div>
      <h2 className="text-2xl rounded-2xl font-bold mb-4">Register</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
