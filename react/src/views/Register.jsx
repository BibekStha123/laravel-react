import React, { useRef, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useStateContext } from './context/ContextProvider';
import axiosClient from '../axios-client';

function Register() {
    
    const [errors, setErrors] = useState();

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const {setUser, setToken} = useStateContext()

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        axiosClient.post('/register', payload)
        .then(({data}) => {
            setUser(data.user);
            setToken(data.token);
        }).catch((error) => {
            setErrors(error.response.data.errors)
        })

    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Create an Account
            </h1>
            { errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
            <input ref={nameRef} type="text" name="" placeholder='Name' />
            <input ref={emailRef} type="email" name="" placeholder='Email' />
            <input ref={passwordRef} type="password" name="" placeholder='Password' />
            <input ref={passwordConfirmationRef} type="password" name="" placeholder='Password Confirmation' />
            <button className="btn btn-block">Register</button>
            <p className="message">
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </form>
    );
}

export default Register;