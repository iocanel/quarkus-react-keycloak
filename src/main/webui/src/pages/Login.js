import { React, useEffect } from 'react';
import { userService } from '../services/UserService';

export default function Login() {
    useEffect(() => {
      if (!userService.isAuthenticated()) {
        userService.login();
      }
    }, []);
  return (
    <div>
      <h2>Login ...</h2>
    </div>
  );
}
