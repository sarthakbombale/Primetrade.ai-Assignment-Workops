import "../styles/Auth.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        setError(null);
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed');
        }
    }

    return (
        <div className="auth-form">
            <h2>Login</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={submit}>
                    <label>Email</label>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={!email || !password}>Login</button>

                <div className="auth-link">
                    Don't have an account? <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;