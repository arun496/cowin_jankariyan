import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import { AuthContext } from '../Contexts/AuthProvider';
import axios from "axios";
import { API_KEY } from '../secrets.js';

export default function Signup(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [region, setRegion] = useState("");
    const [pincode, setPincode] = useState("");
    const { signup } = useContext(AuthContext);

    const handleSignUp = async (e) => {
        e.preventDefault();
        console.log(username, email, password, pincode);
        if (username && email && password && pincode) {
            await signup(email, password, username, pincode);
            props.history.push("/");
            return;
        }
        alert("Please check your credentials again.");
    }

    const fetchLocation = (lat, lng) => {
        axios.get(`https://apis.mapmyindia.com/advancedmaps/v1/${API_KEY}/rev_geocode?lat=${lat}&lng=${lng}`)
        .then(response => {
            console.log(response.data);
            let pin = response.data.results[0].pincode;
            console.log(pin);
            setPincode(pin);
        }).catch(error => {
            console.log(error);
        });
    }

    const setByLatLng = () => {
        function successCb(position) {
            console.log(position);
            let lat = position?.coords?.latitude;
            let lng = position?.coords?.longitude;
            console.log(lat, lng);
            fetchLocation(lat, lng);
            
        }
        function errorCb(error) {
            console.log(error);
        }
        navigator.geolocation.getCurrentPosition(successCb, errorCb);
    }

    const setByRegion = () => {
        if (region) fetchLocation({ region });
        else alert("Check your region...");
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
                    <div className="username-section input-section">
                        <label htmlFor="username" className="label display-block">Username</label>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="username" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="email-section input-section">
                        <label htmlFor="email" className="label display-block">Email Address</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div className="password-section input-section">
                        <label htmlFor="password" className="label display-block">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" spellCheck="false" className="display-block input-items" />
                    </div>
                    <div onClick={setByLatLng} className="file-section input-section">
                        <div className="input-items file-input-section">
                            <i className="fas fa-map-marker-alt" style={{ color: "#2e86de" }} ></i>
                            <span style={{ color: "#2e86de" }} className="upload-title label">&ensp;Set Location</span>
                        </div>
                    </div>
                    <div className="sign-in-btn-section input-section">
                        <button style={{
                            border: "1px solid #2e86de"
                        }} onClick={handleSignUp} className="sign-in-btn display-block input-items">SIGN UP</button>
                    </div>
                    <div className="signup-title" style={{ color: "#a5b1c2", fontSize: "1rem", textAlign: "center" }}>
                        Have an existing account? <Link to="/login" style={{
                            textDecoration: "none",
                            color: "#2e86de",
                        }}>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
