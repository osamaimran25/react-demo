import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { signUpAPI } from './SignupForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const handleSignup = async () => {
        try {
            const response = await signUpAPI(email, password, firstName, lastName);

            if (response.status === 201) {
                setSuccessMessage('Your account is created. Redirecting to login...');
                setErrorMessage('');


                setTimeout(() => {
                    navigate('/login');
                }, 3000);
            } else {
                setErrorMessage('Error: ' + response.data); 
                setSuccessMessage('');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('An error occurred while signing up. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className='container mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    
                        <form>
                            <div className="mb-3">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <button type="button" className="btn btn-btn btn-primary btn-block" onClick={handleSignup}>
                                Sign Up
                            </button>
                        </form>

                        {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
