import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { userService } from '../services/UserService';

export default function PrivateRoute () {
  useEffect(() => {
    if (!userService.isAuthenticated()) {
      userService.login();
    }
  }, []);
  return userService.isAuthenticated() && <Outlet />;
}
