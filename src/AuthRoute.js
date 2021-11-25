import React from 'react'
import { Route } from 'react-router-dom';
import AuthLayout from './components/frontend/auth/AuthLayout';

function AuthRoute({...rest}) 
{
    return (
        <Route {...rest} render={ (props) => <AuthLayout {...props} /> } />
    )
}

export default AuthRoute;
