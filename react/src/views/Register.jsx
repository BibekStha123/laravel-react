import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useStateContext } from './context/ContextProvider';
import axiosClient from '../axios-client';

function Register(props) {

    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault()
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        }

        // const {setUser, setToken} = useStateContext()

        axiosClient.post('/register', payload)
        .then(({data}) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })

    }

    return (
        <form onSubmit={onSubmit}>
            <h1 className="title">
                Create an Account
            </h1>
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