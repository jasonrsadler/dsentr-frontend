import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/stores/auth';

export default function LogoutHandler() {
  const navigate = useNavigate();
  const logout = useAuth((s) => s.logout);

  useEffect(() => {
    logout(); // clears state, deletes cookie (via API), etc.
    navigate('/login', { replace: true });
  }, []);

  return null; // or a spinner
}
