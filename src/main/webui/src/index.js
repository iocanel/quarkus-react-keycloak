import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { userService } from './services/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

const renderApp = () => ReactDOM.render(
    <App />,
    document.getElementById('root')
);
userService.init(renderApp);
