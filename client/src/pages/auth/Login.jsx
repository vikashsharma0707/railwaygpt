import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Login() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const onSubmit = async (data) => {
    try { await login(data); toast.success('Welcome back'); nav(loc.state?.from?.pathname || '/dashboard'); }
    catch (e) { toast.error(e?.response?.data?.message || 'Login failed'); }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">Login to RailwayGPT</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4">
        <div><label className="label">Email</label><input className="input" {...register('email', { required: true })} /></div>
        <div><label className="label">Password</label><input type="password" className="input" {...register('password', { required: true })} /></div>
        <button className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? 'Signing in…' : 'Sign in'}</button>
        <div className="flex justify-between text-sm text-slate-400">
          <Link to="/forgot-password" className="hover:text-white">Forgot password?</Link>
          <Link to="/register" className="hover:text-white">Create account</Link>
        </div>
      </form>
    </div>
  );
}
