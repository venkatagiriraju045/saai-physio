import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/Home.css';

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

    const handleLoginPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    useEffect(() => {
        // Detect device type and set the state
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        isMobile ? setMobile(true) : setMobile(false)
    }, []);


    /*
    useEffect(() => {
        // Set opacity to 0 initially
        if (loading) {
            document.querySelector('.loading-overlay').style.opacity = '1';

            // After 3 seconds, update opacity to 1 without transition

            const initialOpacityTimer = setTimeout(() => {
                document.querySelector('.loading-overlay').style.opacity = '0';
                document.querySelector('.loading-overlay').style.transition = 'opacity 3s ease'; // Add transition for the next 3 seconds

            }, 1000);

            // After 6 seconds, hide the overlay
            const hideOverlayTimer = setTimeout(() => {
                setLoading(false);
            }, 1000);

            return () => {
                clearTimeout(hideOverlayTimer);

                clearTimeout(initialOpacityTimer);
            };
        }
    }, [loading]);


*/



    const handleSubmit = async (e) => {
        setHandleSubmitPressed(true);
        e.preventDefault();
        setLoading(true); // Set loading to true when the submit button is clicked

        try {

            const response = await axios.post(`http://localhost:3000/api/admin-login`, {
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
            <div>
                {/*loading && <div className={overlayClass}>
                    <div className="spinner">
                        <img src="./uploads/loading-brand-logo.png" alt="loading-brand-logo" id="loading-brand-logo" />
                    </div>
                    <img src="./uploads/loading-brand-title.png" alt="loading-brand-title" id="loading-brand-title" />
    </div>*/}
            </div>
            <div className="home-container">
                <div className="home-page-right-container">
                    <img src="./uploads/logo.png" className='crete-icon' />
                    <div className="login-container">
                        {/*
                        <div className='login-page-logo-container'>
                            <img src="./uploads/logo.png" alt="menu image" id="login-page-logo" />
                        </div>
                         */}

                        {loginError && <p className="login-error">{loginError}</p>}
                        {loginSuccess && <p className="login-success">Login successful!</p>}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Login ID</label>
                                <br />
                                <input
                                    value={login_id}
                                    onChange={handleLoginIDChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <br />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={handleLoginPasswordChange}
                                    required
                                />
                            </div>
                            <div className="form-buttons">

                                <button type="submit" className="login-button" disabled={loading}>
                                    {loading ? (
                                        'loading' // Display the loading symbol when loading is true
                                    ) : (
                                        'Enter'
                                    )}
                                </button>
                            </div>

                            {mobile &&
                                <div className="form-group">
                                    <br></br>
                                    <br></br>
                                    <br></br>
                                    <br></br>

                                </div>
                            }
                        </form>
                        {/* 
                        <img src="./uploads/login-page-line.png" alt="menu image" id="login-page-line" />
                        */}
                    </div>
                    <footer id="home-page-footer">
                        &copy; Students Gate Tech Solutions.

                    </footer>
                </div >
                <div className="home-page-left-container">
                    {/*
                    <div className="home-page-main-logo-container">
                        <img src="./uploads/logo.png" alt="menu image" id="home-page-main-logo" />
                    </div>
                */}
                    <div id="about-company-container">
                        <div>
                            <h1 id='clinic-name'>SAAI PHYSIOTHERAPY AND FITNESS CLINIC</h1>
                            <h1 id='clinic-address'>20A/10, SAKTHI NAGAR (SENGODAMPALAYAM  BUS STOP), THINDAL</h1>
                            <br />
                            <p>
                                Welcome to our physiotherapy and fitness clinic. Our personalized programs support injury recovery, pain relief, and fitness enhancement in a motivating environment. With cutting-edge facilities, we're dedicated to empowering you on the path to optimal health and a more active lifestyle.
                            </p>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default Home;
