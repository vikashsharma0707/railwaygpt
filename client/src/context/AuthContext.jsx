import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authApi } from '../api/endpoints';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async () => {
    if (!localStorage.getItem('access')) { setLoading(false); return; }
    try { const r = await authApi.me(); setUser(r.data.data); } catch { setUser(null); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { hydrate(); }, [hydrate]);

  const persistSession = ({ user, access, refresh }) => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setUser(user);
  };

  const login = async (data) => {
    const r = await authApi.login(data);
    persistSession(r.data.data);
    return r.data.data.user;
  };
  const register = async (data) => {
    const r = await authApi.register(data);
    persistSession(r.data.data);
    return r.data.data.user;
  };
  const logout = async () => {
    try { await authApi.logout(localStorage.getItem('refresh')); } catch {}
    localStorage.removeItem('access'); localStorage.removeItem('refresh');
    setUser(null);
  };
  const updateProfile = async (data) => {
    const r = await authApi.updateProfile(data);
    setUser(r.data.data); return r.data.data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, refresh: hydrate }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
