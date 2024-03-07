import { Link, Navigate, Outlet } from "react-router-dom"
import { useStateContext } from "../context/ContextProvider"
import { useEffect } from "react";
import axiosClient from "../../axios-client";

function DefaultLayout() {

    const { users, token, notification, setUsers, setToken } = useStateContext();

    if (!token) {
        return <Navigate to='/login' />
    }

    const onLogout = (e) => {
        e.preventDefault()
        axiosClient.post('/logout')
            .then(({ data }) => {
                setUsers({})
                setToken(null)
            });
    }

    useEffect(() => {
        axiosClient.get('/user')
            .then(({ data }) => {
                setUsers(data);
            })
    }, [])


    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/user">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        Header
                    </div>
                    <div>
                        {users.name}
                        <a href="#" onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
            {notification && <div className="notification">
                {notification}
            </div>}
        </div>
    )
}

export default DefaultLayout