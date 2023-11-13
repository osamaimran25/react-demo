import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
 import { loginApi } from './Login';
interface LoginResponse {
    access: string;
    refresh: string;
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const handleLogin = async () => {
        try {
            const response = await loginApi(email, password);
            const responseData: LoginResponse = await response.json();

            const { access, refresh } = responseData;
            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            if (response.status !== 200) {
                setErrorMessage("login failed");
            } else {
                
                    navigate('/search');
                


            }



        } catch (error) {
            // Handle login error
            console.error('Login failed', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <h2 className='mb-3'>Login</h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="button" className="btn btn-primary" onClick={handleLogin}>
                            Login
                        </button>
                    </form>
                    {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                </div>
            </div>
        </div>
    );
};

export default Login;
