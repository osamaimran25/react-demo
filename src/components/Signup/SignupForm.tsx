import axios from 'axios';

export const signUpAPI = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    const apiUrl = 'https://diango01-stage.us.aldryn.io/auth/signup/';
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

