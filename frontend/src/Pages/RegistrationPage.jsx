import { useState } from 'react';
import { register } from '../Services/users.js';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handeSubmit = async (event) => {
        event.preventDefault();
        try {
            await register(username, email, password, passwordConfirmation);
            // TODO: redirect to some other page?
            alert('Successfully registered!');
        } catch {
            alert('Registration failed!');
        }
    };

    return (
        <div className="flex justify-center">
            <form
                onSubmit={handeSubmit}
                className="flex flex-col w-full max-w-screen-md"
            >
                <label htmlFor="username" className="pt-8 pb-1">
                    Username
                </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    id="username"
                    className="input input-border"
                    required
                    maxLength="50"
                />
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
                <label htmlFor="passwordConfirmation" className="pt-4 pb-1">
                    Password confirmation
                </label>
                <input
                    type="password"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    id="passwordConfirmation"
                    className="input input-border"
                    required
                    minLength="8"
                />
                <button type="submit" className="btn btn-primary mt-4">
                    Register
                </button>
            </form>
        </div>
    );
};

export { RegistrationPage };
