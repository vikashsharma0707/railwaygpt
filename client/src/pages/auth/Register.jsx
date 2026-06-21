import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Register() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const { register: signup } = useAuth();
  const nav = useNavigate();
  const onSubmit = async (data) => {
    try { await signup(data); toast.success('Account created'); nav('/dashboard'); }
    catch (e) { toast.error(e?.response?.data?.message || 'Registration failed'); }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">Create your RailwayGPT account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4">
        <div><label className="label">Name</label><input className="input" {...register('name', { required: true })} /></div>
        <div><label className="label">Email</label><input className="input" {...register('email', { required: true })} /></div>
        <div><label className="label">Phone</label><input className="input" {...register('phone')} /></div>
        <div><label className="label">Password</label><input type="password" className="input" {...register('password', { required: true, minLength: 6 })} /></div>
        <button className="btn-primary w-full" disabled={isSubmitting}>{isSubmitting ? 'Creating…' : 'Create account'}</button>
        <p className="text-sm text-slate-400">Already have an account? <Link to="/login" className="text-brand-400">Sign in</Link></p>
      </form>
    </div>
  );
}
