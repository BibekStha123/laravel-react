import { useEffect, useState } from "react"
import axiosClient from "../axios-client"

function User() {

    const [loading, setLoading] = useState()

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then((data) => {
                setLoading(false)
                console.log(data)
            })
            .catch((error) => {
                setLoading(false)
                console.log(error)
            })
    }

    return (
        <div>
            user
        </div>
    )
}

export default User