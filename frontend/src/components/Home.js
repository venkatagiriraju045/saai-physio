import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/login-page.css';
import bvambient from './bvambient.js';
import './CSS/flower.css';
import './CSS/power-button.css';
import powerButtonImg from './power-button.png';
const Home = () => {
    const [login_id, setLoginID] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [handleSubmitPressed, setHandleSubmitPressed] = useState(false);
    const navigate = useNavigate();
    const [mobile, setMobile] = useState(false);


    const overlayClass = `loading-overlay${loading ? ' visible' : ''}`;
    const handleLoginIDChange = (e) => {
        setLoginID(e.target.value);
    };
    useEffect(() => {
        // Detect device type and set the state
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        isMobile ? setMobile(true) : setMobile(false);

        // Initialize BVAmbient object
        const demo1 = new bvambient({
            selector: "#ambient",
            fps: 60,
            max_transition_speed: 12000,
            min_transition_speed: 8000,
            particle_number: 30,
            particle_maxwidth: 60,
            particle_minwidth: 10,
            particle_radius: 50,
            particle_opacity: true,
            particle_colision_change: true,
            particle_background: "#48cae4",
            refresh_onfocus: true,
            particle_image: {
                image: false,
                src: ""
            },
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        particle_number: "15"
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        particle_number: "10"
                    }
                }
            ]
        });
    }, []); // Empty dependency array to run only once when the component mounts



    const handleLoginPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        // Detect device type and set the state
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        isMobile ? setMobile(true) : setMobile(false);
    }, []);


    const handleSubmit = async (e) => {
        setHandleSubmitPressed(true);
        e.preventDefault();
        setLoading(true); // Set loading to true when the submit button is clicked

        try {
            const response = await axios.post(`https://saai-physio-api.vercel.app/api/admin-login`, {
                login_id: login_id,
                password: password,
            });
            if (response.data.success) {
                navigate('/AdminMenu', { state: { login_id: login_id } });
            } else {
                setLoginError('Invalid Login ID or password');
                setTimeout(() => {
                    setLoginError('');
                }, 5000);
            }
        } catch (error) {
            setLoginError('Invalid login ID or password');
            setTimeout(() => {
                setLoginError('');
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div id="ambient" style={{ overflow: 'hidden', position: 'absolute', width: '100vw', height: '100vh' }}></div>
            <div className="user-login-signup-container">
                <div className="container" id="container">
                    <div className="form-container sign-in-container">
                        <form className="form" onSubmit={handleSubmit}>

                            <h1>Log in</h1>

                            {loginError && <p className="login-error">{loginError}</p>}
                            {loginSuccess && <p className="login-success">Login successful!</p>}
                            <div className="form-control">
                                <input
                                    className="input-field"
                                    type="text"
                                    required
                                    value={login_id}
                                    onChange={handleLoginIDChange}
                                />
                                <label>
                                    <span style={{ transitionDelay: '0ms' }}>E</span>
                                    <span style={{ transitionDelay: '50ms' }}>m</span>
                                    <span style={{ transitionDelay: '100ms' }}>a</span>
                                    <span style={{ transitionDelay: '150ms' }}>i</span>
                                    <span style={{ transitionDelay: '200ms' }}>l</span>
                                </label>
                            </div>
                            <div className="form-control">
                                <input
                                    className="input-field"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={handleLoginPasswordChange} />
                                <label>
                                    <span style={{ transitionDelay: '0ms' }}>P</span>
                                    <span style={{ transitionDelay: '50ms' }}>a</span>
                                    <span style={{ transitionDelay: '100ms' }}>s</span>
                                    <span style={{ transitionDelay: '150ms' }}>s</span>
                                    <span style={{ transitionDelay: '200ms' }}>w</span>
                                    <span style={{ transitionDelay: '250ms' }}>o</span>
                                    <span style={{ transitionDelay: '300ms' }}>r</span>
                                    <span style={{ transitionDelay: '350ms' }}>d</span>
                                </label>
                            </div>
                            <button type="submit" className="action-button" disabled={loading}>
                                {loading ? (
                                    'loading' // Display the loading symbol when loading is true
                                ) : (
                                    'Log in'
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="right-container">
                        <div className="right-container-content">
                            <div className="right-container-content-panel right-container-content-right">
                                <h1>Hello, Admin!</h1>
                                <p>Enter your personal details and start the journey with us</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a class="flower-btn">
                <div class="flower-wrapper">

                    <div class="flower flower1">
                        <div class="petal one"></div>
                        <div class="petal two"></div>
                        <div class="petal three"></div>
                        <div class="petal four"></div>
                    </div>
                    <div class="flower flower2">
                        <div class="petal one"></div>
                        <div class="petal two"></div>
                        <div class="petal three"></div>
                        <div class="petal four"></div>
                    </div>
                    <div class="flower flower3">
                        <div class="petal one"></div>
                        <div class="petal two"></div>
                        <div class="petal three"></div>
                        <div class="petal four"></div>
                    </div>
                    <div class="flower flower4">
                        <div class="petal one"></div>
                        <div class="petal two"></div>
                        <div class="petal three"></div>
                        <div class="petal four"></div>
                    </div>
                    <div class="flower flower5">
                        <div class="petal one"></div>
                        <div class="petal two"></div>
                        <div class="petal three"></div>
                        <div class="petal four"></div>
                    </div>
                    <div class="flower flower6">
                        <div class="petal one"></div>
                        <div class="petal two"></div>
                        <div class="petal three"></div>
                        <div class="petal four"></div>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Home;
