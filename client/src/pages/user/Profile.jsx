import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import { authApi } from '../../api/endpoints';

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { register, handleSubmit } = useForm({ defaultValues: user });
  const { register: regPw, handleSubmit: hsPw, reset } = useForm();

  const save = async (d) => {
    try { await updateProfile(d); toast.success('Updated'); }
    catch { toast.error('Failed'); }
  };
  const changePw = async (d) => {
    try { await authApi.changePassword(d); toast.success('Password changed'); reset(); }
    catch (e) { toast.error(e?.response?.data?.message || 'Failed'); }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <form onSubmit={handleSubmit(save)} className="card mt-4 grid md:grid-cols-2 gap-3">
          <div><label className="label">Name</label><input className="input" {...register('name')} /></div>
          <div><label className="label">Phone</label><input className="input" {...register('phone')} /></div>
          <div><label className="label">Preferred Berth</label>
            <select className="input" {...register('preferences.berth')}>
              <option value="any">Any</option><option value="lower">Lower</option><option value="middle">Middle</option><option value="upper">Upper</option><option value="side-lower">Side Lower</option><option value="side-upper">Side Upper</option>
            </select>
          </div>
          <div><label className="label">Preferred Language</label>
            <select className="input" {...register('preferences.language')}>
              <option value="en">English</option><option value="hi">Hindi</option><option value="ta">Tamil</option><option value="te">Telugu</option><option value="bn">Bengali</option>
            </select>
          </div>
          <div className="md:col-span-2"><button className="btn-primary">Save</button></div>
        </form>
      </div>
      <div>
        <h2 className="text-xl font-bold">Change password</h2>
        <form onSubmit={hsPw(changePw)} className="card mt-4 grid md:grid-cols-2 gap-3">
          <div><label className="label">Old password</label><input type="password" className="input" {...regPw('oldPassword', { required: true })} /></div>
          <div><label className="label">New password</label><input type="password" className="input" {...regPw('newPassword', { required: true, minLength: 6 })} /></div>
          <div className="md:col-span-2"><button className="btn-primary">Update password</button></div>
        </form>
      </div>
    </div>
  );
}
