  export const loginApi = async (email: string, password: string)  => {
    const apiUrl = 'http://127.0.0.1:8000/auth/login/';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
  
      return  response;
    } catch (error) {
      throw new Error(`Login request failed: ${error}`);
    }
  };
  