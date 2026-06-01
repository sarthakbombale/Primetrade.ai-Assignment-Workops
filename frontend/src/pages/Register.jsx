import "../styles/Auth.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        setError(null);
        try {
            await api.post('/auth/register', { name, email, password });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Registration failed');
        }
    }

    return (
        <div className="auth-form">
            <h2>Register</h2>
            {error && <div className="error">{error}</div>}
            <form onSubmit={submit}>
                <label>Name</label>
                <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={!name || !email || !password}>Register</button>
                <div className="auth-link">
                    Already have an account? <Link to="/">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;