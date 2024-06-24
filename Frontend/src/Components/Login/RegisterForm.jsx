import React, { useState } from 'react';
import userService from './loginService';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username.includes(' ') || password.includes(' ')) {
      setMessage('Username and password cannot contain spaces.');
      setIsSuccess(false);
      return;
    }

    if (password.length < 7) {
      setMessage('Password must be at least 7 characters long.');
      setIsSuccess(false);
      return;
    }

    try {
      const result = await userService.register(username, email, password);
      if (result === 'User registered successfully') {
        setMessage(result);
        setIsSuccess(true);
      } else {
        setMessage(result);
        setIsSuccess(false);
      }
    } catch (error) {
      setMessage(error);
      setIsSuccess(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl rounded-2xl font-bold mb-4">Register</h2>
      {message && (
        <p className={`mb-4 font-bold ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleRegister}>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default RegisterForm;
