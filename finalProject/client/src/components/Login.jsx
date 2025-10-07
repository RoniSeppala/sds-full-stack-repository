import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from "./LoadSpinner.jsx"

export default function Login() {
    // Form state and data
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const { email, password } = formData

    // Redux and navigation hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)

    // Side effects
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

    const onSubmit = (element) => {
        element.preventDefault()
        const userData = {
            email,
            password,
        }
        dispatch(login(userData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <section className="form">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={onChange}
                    />
                </div>
                <button type="submit" className="btn">
                    Login
                </button>
            </form>
        </section>
    )
}