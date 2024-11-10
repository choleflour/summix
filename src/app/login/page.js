"use client";

import { signIn } from '../controllers/login-utils';
import './loginpage.css';

export default function LoginPage() {
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    return (
        <div className="login-container">
            <form onSubmit={e => e.preventDefault()} className="login-form">
                
                {/* Logo */}
                <div className="login-logo">
                    <img src="/logo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
                </div>
            

                <div style={{ marginBottom: '1em', textAlign: 'left', marginTop: '20px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        style={{ width: '100%', padding: '8px', backgroundColor:'#FFFFFF', borderRadius: '12px', marginTop: '7px'}}
                    />
                </div>

                <div style={{ marginBottom: '1em', textAlign: 'left', marginTop: '10px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        style={{ width: '100%', padding: '8px',  backgroundColor:'#FFFFFF', borderRadius: '12px', marginTop: '7px', marginBottom: '10px'}}
                    />
                </div>

                <button type="submit" className="login-button" onClick={signIn}>Login</button>

                <div style={{ textAlign: 'center', marginTop: '1em'}}>
                    <a href="/forgot-password" className="forgot-password-link">
                        Forgot Password?
                    </a>
                </div>
            </form>
        </div>
    );
}