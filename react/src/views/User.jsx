import { useEffect, useState } from "react"
import axiosClient from "../axios-client"
import { Link } from "react-router-dom"

function User() {

    const [loading, setLoading] = useState()
    const [users, setUsers] = useState([])


    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({ data }) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }

    const onDelete = (u) => {
        if (!window.confirm('Are you sure?')) {
            return
        } else {
            axiosClient.delete(`/users/${u.id}`)
                .then(() => {
                    getUsers()
                })
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1>Users</h1>
                <Link to="/user/create" className="btn-add">Add User</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading ?
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody> :
                        <tbody>
                            {users.map((u, index) => (
                                <tr key={index}>
                                    <td>{u.id}</td>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.created_at}</td>
                                    <td>
                                        <Link className="btn-edit" to={'/user/' + u.id}>Edit</Link>&nbsp;
                                        <button onClick={e => onDelete(u)} className="btn-delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>}
                </table>
            </div>
        </div>
    )
}

export default User