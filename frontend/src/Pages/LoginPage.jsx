import { useState } from 'react';
import { login } from '../Services/users.js';

const LoginPage = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handeSubmit = async (event) => {
        event.preventDefault();
        try {
            const result = await login(email, password);
            setToken(result.token);
            localStorage.setItem('token', result.token);
            // TODO: redirect to some other page?
            alert('Successfully logged in!');
        } catch {
            alert('Login failed!');
        }
    };

    return (
        <div className="flex justify-center">
            <form
                onSubmit={handeSubmit}
                className="flex flex-col w-full max-w-screen-md"
            >
                <label htmlFor="email" className="pt-4 pb-1">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="input input-border"
                    required
                />
                <label htmlFor="password" className="pt-4 pb-1">
                    Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    className="input input-border"
                    required
                    minLength="8"
                />
                <button type="submit" className="btn btn-primary mt-4">
                    Login
                </button>
            </form>
        </div>
    );
};

export { LoginPage };
