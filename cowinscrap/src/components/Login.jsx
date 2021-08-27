import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthProvider';
import "../css/Authentication.css";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);

    const handleSignIn = async () => {
        if (email && password) {
            await login(email, password);
            props.history.push("/");
            return;
        }
        alert("Please check your credentials again.");
    }

    return (
        <div className="auth-page-card">
            <div className="site-info-section">
                <div className="title-section">
                    <div className="title-highlighted-section">
                        <div className="title-highlighted-name">Cowin</div>
                        <div className="title-highlighter"></div>
                    </div>
                    <div className="title-unhighlighted-section">Jankariyan</div>
                </div>
                <div className="description-section">
                    Book your slots on availability right away
                </div>
            </div>
            <div className="auth-section">
                <div className="auth-card">
                    <div className="email-section input-section">
                        <label htmlFor="email" className="label display-block">Email Address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="password-section input-section">
                        <label htmlFor="password" className="label display-block">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="sign-in-btn-section input-section">
                        <button style={{
                            border: "1px solid #2e86de"
                        }} onClick={handleSignIn} className="sign-in-btn display-block input-items">SIGN IN</button>
                    </div>
                    <div className="signup-title" style={{ color: "#a5b1c2", fontSize: "1rem", textAlign: "center" }}>
                        New here? Create your account <Link to="/signup" style={{
                            textDecoration: "none",
                            color: "#2e86de",
                        }}>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
