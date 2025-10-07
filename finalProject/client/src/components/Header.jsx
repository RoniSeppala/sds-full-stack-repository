import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {logout, reset} from '../features/auth/authSlice';

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }
    
    return (
        <header className="header">
            <h1>My Application</h1>
            <ul>
                {user ? (
                    <li>
                        <button className='btn' onClick={onLogout}>Logout</button>
                    </li>
                ) : (
                    <li>
                        <Link to="/login" className='btn'>Login</Link>
                        <Link to="/register" className='btn'>Register</Link>
                    </li>
                )}
            </ul>
        </header>
    );
}