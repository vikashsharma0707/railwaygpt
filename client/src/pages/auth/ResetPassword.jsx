import { useForm } from 'react-hook-form';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authApi } from '../../api/endpoints';

export default function ResetPassword() {
  const [params] = useSearchParams();
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();
  const onSubmit = async (d) => {
    try { await authApi.reset(params.get('token'), d.password); toast.success('Password reset'); nav('/login'); }
    catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
  };
  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold">Choose a new password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card mt-6 space-y-4">
        <div><label className="label">New password</label><input type="password" className="input" {...register('password', { required: true, minLength: 6 })} /></div>
        <button className="btn-primary w-full">Reset password</button>
      </form>
    </div>
  );
}
