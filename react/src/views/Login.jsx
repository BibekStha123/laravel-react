import React from 'react';
import { Link } from 'react-router-dom';

function Login(props) {

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Login Form
            </h1>
            <input type="email" name="" id="" placeholder='Email' />
            <input type="password" name="" id="" placeholder='Password' />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered? <Link to="/register">Create an account</Link>
            </p>
        </form>
    );
}

export default Login;