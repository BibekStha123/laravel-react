import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import { useStateContext } from './context/ContextProvider';

function Login(props) {

    const { setUsers, setToken } = useStateContext();
    const [errors, setErrors] = useState();
    const [errorStatus, setErrorStatus] = useState();

    const emailRef = useRef();
    const passwordRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        axiosClient.post('/login', payload)
            .then(({data}) => {
                setUsers(data.user)
                setToken(data.token)
            }).catch(({response}) => {
                setErrors(response.data.errors)
                setErrorStatus(response.status)
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Login Form
            </h1>
            {errors && errorStatus == 422 && <div className='alert'>
                {Object.keys(errors).map(key => (
                    <p key={key}>{errors[key][0]}</p>
                ))}
            </div>}
            {
                errors && errorStatus == 401 && <div className="alert">
                    <p>{errors}</p>
                </div>
            }
            <input ref={emailRef} type="email" name="" placeholder='Email' />
            <input ref={passwordRef} type="password" name="" placeholder='Password' />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered? <Link to="/register">Create an account</Link>
            </p>
        </form>
    );
}

export default Login;