import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../types/auth';
import type { LoginFormData } from '../../types/auth';
import { login, getMe } from '../../api';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';

interface LoginFormProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { setUser } = useAuthStore();
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data);
      if (response.success) {
        const meResponse = await getMe();
        if (meResponse.success && meResponse.user) {
          setUser(meResponse.user);
          toast.success(response.message || "Welcome back!");
          onSuccess?.();
        } else {
          toast.error("Login successful but failed to fetch user info.");
          onError?.("Login successful but failed to fetch user info.");
        }
      } else {
        toast.error(response.message);
        onError?.(response.message);
      }
    } catch (err) {
      toast.error("An error occurred during login.");
      onError?.("An error occurred during login.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-on-surface tracking-tight" htmlFor="email">Email Address</label>
        <div className="relative group">
          <input
            {...register('email')}
            className={`w-full px-4 py-3 bg-slate-100 border-none rounded-lg text-on-surface placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
            id="email"
            placeholder="name@example.com"
            type="email"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-on-surface tracking-tight" htmlFor="password">Password</label>
          <a className="text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors tracking-wide uppercase" href="#">Forgot Password?</a>
        </div>
        <div className="relative group">
          <input
            {...register('password')}
            className={`w-full px-4 py-3 bg-slate-100 border-none rounded-lg text-on-surface placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
            id="password"
            placeholder="••••••••"
            type="password"
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>
      </div>

      <div className="pt-4 space-y-6">
        <button
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-r from-blue-950 to-blue-900 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-900/20 hover:scale-[1.01] active:scale-95 transition-all duration-300 tracking-tight disabled:opacity-50"
          type="submit"
        >
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  );
};
