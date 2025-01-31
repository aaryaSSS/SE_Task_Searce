import React from 'react';
import { useForm } from 'react-hook-form';
import { useRegisterMutation } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [registerUser, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    await registerUser(formData);
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500">{error.data?.message || 'Signup failed'}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="border p-2 w-full" placeholder="Name" {...register('name')} required />
        <input className="border p-2 w-full" placeholder="Email" {...register('email')} required />
        <input className="border p-2 w-full" type="password" placeholder="Password" {...register('password')} required />
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full" disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
