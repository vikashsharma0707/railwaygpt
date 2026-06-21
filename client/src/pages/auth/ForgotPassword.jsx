import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authApi } from '../../api/endpoints';
export default function ForgotPassword() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (d) => {
    try { await authApi.forgot(d.email); toast.success('Check your email'); }
    catch { toast.error('Failed'); }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">Reset your password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4">
        <div><label className="label">Email</label><input className="input" {...register('email', { required: true })} /></div>
        <button className="btn-primary w-full">Send reset link</button>
      </form>
    </div>
  );
}
