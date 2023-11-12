import axios from 'axios';

export const signUpAPI = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    const apiUrl = 'http://127.0.0.1:8000/auth/signup/';
    const requestData = {
      email,
      password,
      first_name: firstName,
      last_name: lastName
    };

    const response = await axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response;
  } catch (error) {
    throw error;
  }
};

