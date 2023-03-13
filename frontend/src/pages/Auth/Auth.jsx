import React, { useState } from 'react'
import './Auth.css'
import logo from '../../img/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { logIn, signUp } from '../../actions/AuthActions'

const Auth = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.authReducer.loading);
    const [isSignUp, setIsSignUp] = useState(true);

    const formData = {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmpass: ""
    };
    const [data, setData] = useState(formData);
    const [confirmPass, setConfirmPass] = useState(true);

    // handle Changes in input
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    // Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmPass(true);
        if (isSignUp) {
            data.confirmpass === data.password
                ? dispatch(signUp(data))
                : setConfirmPass(false);
        } else {
            dispatch(logIn(data));
        }
    };

    // Reset Form
    const resetForm = () => {
        setConfirmPass(true);
        setData(formData);
    };

    return (
        <div className='auth'>
            {/* Left Side */}
            <div className="auth-left">
                <img src={logo} alt="" />
                <div className="webName">
                    <h1>FLY Media</h1>
                    <h6>Explore the ideas throughout the world</h6>
                </div>
            </div>

            {/* Right Side */}
            <div className="auth-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>{isSignUp ? "Sign up" : "Log In"}</h3>

                    {isSignUp && (
                        <div>
                            <input
                                onChange={handleChange}
                                type="text"
                                name='firstname'
                                placeholder='First Name'
                                className='infoInput'
                                value={data.firstname}
                                required />
                            <input
                                onChange={handleChange}
                                type="text"
                                name='lastname'
                                placeholder='Last Name'
                                className='infoInput'
                                value={data.lastname}
                                required />
                        </div>
                    )}

                    <div>
                        <input
                            onChange={handleChange}
                            type="text"
                            name='username'
                            placeholder='Username'
                            className="infoInput"
                            value={data.username}
                            required />
                    </div>

                    <div>
                        <input
                            onChange={handleChange}
                            type="password"
                            name='password'
                            placeholder='Password'
                            className='infoInput'
                            value={data.password}
                            required
                            minLength={6} />

                        {isSignUp && (
                            <input
                                onChange={handleChange}
                                type="password"
                                name='confirmpass'
                                placeholder='Confirm Password'
                                className='infoInput'
                                required
                            />
                        )}

                    </div>
                    <span className='conPass'
                        style={{ display: confirmPass ? "none" : "block", }}>
                        * Confirm Password is not same
                    </span>
                    <div>
                        <span id='signLoginText'
                            onClick={() => {
                                resetForm();
                                setIsSignUp((prev) => !prev);
                            }}
                        >
                            {isSignUp
                                ? " Already have an account. Login!"
                                : "Don't have an account? Sign Up"}
                        </span>
                    </div>

                    <button
                        className="button submitBtn"
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? "Loading..." : isSignUp ? "Signup" : "Log In"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Auth;