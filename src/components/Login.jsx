import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, { data, isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      await login(formData).unwrap(); // Ensures proper error handling
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    }
  }, [data, navigate]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Login</h2>

      {error && (
        <p className="text-red-500">{error?.data?.message || 'Invalid credentials'}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            className="border p-2 w-full"
            placeholder="Username"
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </div>

        <div>
          <input
            className="border p-2 w-full"
            type="password"
            placeholder="Password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
