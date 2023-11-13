  export const loginApi = async (email: string, password: string)  => {
    const apiUrl = 'https://diango01-stage.us.aldryn.io/auth/login/';
  
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
  