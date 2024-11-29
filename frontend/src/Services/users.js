import axios from 'axios';

const baseUrl = `https://recipesharing-9sg4.onrender.com/api/auth`;

const register = (username, email, password, passwordConfirmation) => {
    return axios
        .post(`${baseUrl}/register`, {
            username,
            email,
            password,
            passwordConfirmation,
        })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const login = (email, password) => {
    return axios
        .post(`${baseUrl}/login`, { email, password })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const checkToken = (token) => {
    return axios
        .get(`${baseUrl}/token`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.data)
        .catch((error) => {
            throw error;
        });
};

const logout = (setToken) => {
    setToken(null);
    localStorage.removeItem('token');
};

export { register, login, checkToken, logout };
