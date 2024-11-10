'use client';
import './create.css';
import {useState} from 'react';
import { signUp } from '../controllers/login-utils';
export default function CreateAccount() {
    const [userEmail, setUserEmail] = useState('');
    const [userPass, setUserPass] = useState('');
    return(
        <div className="create-container">
            <form onSubmit={e => e.preventDefault()} className="create-form">
                
                {/* Logo */}
                <div className="create-logo">
                    <img src="/logo.png" alt="Logo" style={{ width: '50px', height: 'auto' }} />
                </div>
            

                <div style={{ marginBottom: '1em', textAlign: 'left', marginTop: '20px' }}>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        required
                        style={{ width: '100%', padding: '8px', backgroundColor:'#FFFFFF', borderRadius: '12px', marginTop: '7px'}}
                        onChange={function (e) {
                            setUserEmail(e.target.value)
                          }}
                    />
                </div>

                <div style={{ marginBottom: '1em', textAlign: 'left', marginTop: '10px' }}>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        required
                        style={{ width: '100%', padding: '8px',  backgroundColor:'#FFFFFF', borderRadius: '12px', marginTop: '7px', marginBottom: '10px'}}
                        onChange={function (e) {
                            setUserPass(e.target.value)
                          }}
                    />
                </div>

                <button type="submit" className="create-button" onClick={() => {signUp(userEmail, userPass); }}>Create Account</button>

                <div style={{ textAlign: 'center', marginTop: '1em'}}>
                    <a href="/login" className="login-link">
                        Already a user? Click to login
                    </a>
                </div>
            </form>
        </div>
    )
}