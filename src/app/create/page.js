import './create.css';

export default function CreateAccount() {
    return(
        <div className="create-container">
            <form action="/preferences" method="post" className="create-form">
                
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

                <button type="submit" className="create-button">Create Account</button>

                <div style={{ textAlign: 'center', marginTop: '1em'}}>
                    <a href="/login" className="login-link">
                        Already a user? Click to login
                    </a>
                </div>
            </form>
        </div>
    )
}