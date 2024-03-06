import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';

function UserFrom() {

    const { id } = useParams();
    const [user, setUser] = useState({
        id: null,
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    })
    const [loading, setLoading] = useState(false)

    if (id) {
        useEffect(() => {
            setLoading(true)
            axiosClient.get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false)
                    setUser(data.user)
                })
                .catch(() => {
                    setLoading(false)
                })
        }, []);
    }

    const onSubmit = (e) => {
        e.preventDefault
        if(id) {
            axiosClient.put(`/users/${id}`, user)
            .then(() => {

            })
        }
    }

    return (
        <div>
            {id ? <h2>Update User: {user.name}</h2> : <h2>Create User</h2>}
            <div className="card animated fadeInDown">
                {loading ?
                    <div className='text-center'>Loading...</div>
                    :
                    <form onSubmit={onSubmit}>
                        <input value={user.name} onChange={e => setUser({...user, name: e.target.value})} type='text' placeholder='Name'></input>
                        <input value={user.email} onChange={e => setUser({...user, email: e.target.value})} type='email' placeholder='Email'></input>
                        <input onChange={e => setUser({...user, password: e.target.value})} type='password' placeholder='Password'></input>
                        <input onChange={e => setUser({...user, password_confirmation: e.target.value})} type='password' placeholder='Confirm Password'></input>
                        <button className='btn'>Submit</button>
                    </form>
                }
            </div>
        </div>
    );
}

export default UserFrom;