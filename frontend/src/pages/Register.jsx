import "../styles/Auth.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api';
import { Link } from "react-router-dom";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function submit(e) {
        e.preventDefault();
        try {
            await api.post('/auth/register', { name, email, password });
            toast.success('Account created successfully');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Registration failed');
        }
    }

    return (
        <div className="auth-form">
            <h2>Register</h2>
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
                    Already have an account? <Link className="auth-link" to="/">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;