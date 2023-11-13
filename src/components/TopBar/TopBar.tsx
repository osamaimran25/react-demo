import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface UserDetails {
    email: string;
}

const TopBar: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await fetch('https://diango01-stage.us.aldryn.io/auth/user-details/', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserDetails(data);
                } else {
                    console.error('Error fetching user details');
                }
            } catch (error) {
                console.error('Error fetching user details', error);
            }
        };

        fetchUserDetails();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container d-flex justify-content-between">
                <div className="navbar-brand">Product Search</div>
                <div className="d-flex">
                    <div className="navbar-text mr-3">{userDetails && <b>Welcome, {userDetails.email}</b>}</div>
                    <button className="btn  pl-10 " onClick={handleLogout}>
                        <b>
                            Logout

                        </b>
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default TopBar;
