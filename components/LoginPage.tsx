
import React, { useState } from 'react';

// This component provides a user interface for logging in or creating an account.
// In this frontend-only application, it is purely for demonstration and does not perform real authentication.

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggles between login and sign-up form

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., call an API).
    alert("This is a demo. No actual login/signup is performed.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-green-800">
            {isLogin ? 'Welcome Back!' : 'Create Your Account'}
          </h2>
          <p className="mt-2 text-gray-600">
            {isLogin ? 'Sign in to access your projects.' : 'Join us to build a sustainable future.'}
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <InputField id="name" name="name" type="text" placeholder="Full Name" />
          )}
          <InputField id="email" name="email" type="email" placeholder="Email Address" />
          <InputField id="password" name="password" type="password" placeholder="Password" />
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
        </form>
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-green-600 hover:text-green-500"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};

// A helper component for styled input fields.
const InputField: React.FC<{id: string, name: string, type: string, placeholder: string}> = (props) => (
    <div>
        <label htmlFor={props.id} className="sr-only">{props.placeholder}</label>
        <input {...props} required className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm" />
    </div>
);

export default LoginPage;
