import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema } from '../../types/auth';
import type { SignupFormData } from '../../types/auth';
import { signup } from '../../api';
import toast from 'react-hot-toast';

interface SignupFormProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSuccess, onError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: 'user',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const response = await signup(data);
      if (response.success) {
        toast.success(response.message || "Registration successful!");
        onSuccess?.();
      } else {
        toast.error(response.message);
        onError?.(response.message);
      }
    } catch (err: any) {
      // In case of 409 (already exists) or other technical errors, better to show a cleaner message if available
      const errMsg = err?.message || "An error occurred during registration.";
      toast.error(errMsg);
      onError?.(errMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-on-surface font-label ml-1" htmlFor="fullname">Full Name</label>
        <div className="relative group">
          <input
            {...register('fullname')}
            className={`w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400 ${errors.fullname ? 'ring-2 ring-red-500' : ''}`}
            placeholder="John Doe"
            type="text"
            id="fullname"
          />
          {errors.fullname && <p className="text-xs text-red-500 mt-1">{errors.fullname.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-on-surface font-label ml-1" htmlFor="email">Email Address</label>
        <div className="relative group">
          <input
            {...register('email')}
            className={`w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400 ${errors.email ? 'ring-2 ring-red-500' : ''}`}
            placeholder="name@company.com"
            type="email"
            id="email"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface font-label ml-1" htmlFor="password">Password</label>
          <input
            {...register('password')}
            className={`w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400 ${errors.password ? 'ring-2 ring-red-500' : ''}`}
            placeholder="••••••••"
            type="password"
            id="password"
          />
          {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-on-surface font-label ml-1" htmlFor="role">Role</label>
          <select
            {...register('role')}
            className="w-full px-5 py-4 bg-slate-100 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
            id="role"
          >
            <option value="user">User</option>
            <option value="owner">Owner</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <p className="text-xs text-red-500 mt-1">{errors.role.message}</p>}
        </div>
      </div>

      <div className="pt-4">
        <button
          disabled={isSubmitting}
          className="w-full py-4 bg-gradient-to-br from-blue-950 to-blue-900 text-white font-bold rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-150 flex justify-center items-center gap-2 disabled:opacity-50"
          type="submit"
        >
          {isSubmitting ? 'Creating account...' : 'Create Account'}
        </button>
      </div>
    </form>
  );
};
