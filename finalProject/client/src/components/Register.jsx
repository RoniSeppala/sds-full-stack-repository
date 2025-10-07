import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import Spinner from "./LoadSpinner.jsx"
import { useSelector } from 'react-redux'

export default function Register() {
    // Form state and data
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    })
    const { username, email, password, password2 } = formData

    // Redux and navigation hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    const onSubmit = (element) => {
        element.preventDefault()
        if (password !== password2) {
            toast.error('Passwords do not match')
        } else {
            const userData = {
                username,
                email,
                password,
            }
            dispatch(register(userData))
        }
    }

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <section className="form">
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        id = "name"
                        name = "username"
                        type = "text"
                        value = {username}
                        placeholder = "Enter your name"
                        onChange = {onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        id = "email"
                        name = "email"
                        type = "email"
                        value = {email}
                        onChange={onChange}
                        placeholder = "Enter your email"
                    />
                </div>
                <div className="form-group">
                    <input
                        id = "password"
                        name = "password"
                        type = "password"
                        value = {password}
                        onChange={onChange}
                        placeholder = "Enter your password"
                    />
                </div>
                <div className="form-group">
                    <input
                        id = "password2"
                        name = "password2"
                        type = "password"
                        value = {password2}
                        onChange={onChange}
                        placeholder = "Confirm your password"
                    />
                </div>
                <button type="submit" className="btn">
                    Register
                </button>
            </form>
        </section>
    )
}