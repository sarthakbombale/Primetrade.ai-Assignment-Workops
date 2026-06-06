import "../styles/Auth.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api';
import { Link } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    async function submit(e) {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            const token = res.data.token || res.data?.data?.token;
            if (!token) throw new Error('Token not returned');
            login(token);
            toast.success('Logged in successfully');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Login failed');
        }
    }

    return (
        <div className="auth-form">
            <h2>Login</h2>
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
                    Don't have an account? <Link className="auth-link" to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;