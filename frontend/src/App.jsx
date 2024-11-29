import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MainPage } from './Pages/MainPage';
import { RecipePage } from './Pages/RecipePage';
import { CreateRecipe } from './Pages/CreateRecipe';
import { RegistrationPage } from './Pages/RegistrationPage.jsx';
import { LoginPage } from './Pages/LoginPage.jsx';
import { LogOutButton } from './Components/LogOutButton.jsx';
import { useEffect, useState } from 'react';
import { checkToken, logout } from './Services/users.js';
import { ProfilePage } from './Pages/ProfilePage.jsx';

function App() {
    // If token is null, user is not logged in
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Validity of the token from the local storage is checked
            checkToken(token)
                .then(() => {
                    setToken(token);
                })
                .catch(() => {
                    setToken(null);
                });
        }
    }, []);

    return (
        <Router>
            <div className="container mx-auto">
                <div className="w-fit mx-auto">
                    {/* Header */}
                    <div className="flex justify-between w-full p-4">
                        {/* Header title */}
                        <div className="content-center">
                            <Link to="/">
                                <h1 className="text-4xl font-bold">
                                    RecipeSharing
                                </h1>
                            </Link>
                        </div>
                        {/* Header buttons */}
                        <div className="flex gap-2">
                            {/* If the user has logged in */}
                            {token && (
                                <>
                                    <Link to="/recipe/create">
                                        <button className="btn btn-neutral">
                                            Create your own recipe
                                        </button>
                                    </Link>
                                    <LogOutButton
                                        logout={() => logout(setToken)}
                                    />
                                    <Link to="/Profile">
                                        <button className="btn btn-neutral">
                                            Profile
                                        </button>
                                    </Link>
                                </>
                            )}
                            {/* If the user hasn't logged in */}
                            {!token && (
                                <>
                                    <Link to="/login">
                                        <button className="btn btn-neutral">
                                            Login
                                        </button>
                                    </Link>
                                    <Link to="/registration">
                                        <button className="btn btn-neutral">
                                            Create an account
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    {/* Main content
                    
                        Width of the div is hardcoded based on the width of the main page to ensure
                        that the width doesn't change when changing to different page, this could
                        probably be improved.
                    */}
                    <div className="md:w-[641px] lg:w-[848px] xl:w-[1104px] 2xl:w-[1360px]">
                        <Routes>
                            <Route
                                path="/recipe/:id"
                                element={<RecipePage token={token} />}
                            />
                            <Route path="/" element={<MainPage />} />
                            <Route
                                path="/recipe/create"
                                element={<CreateRecipe />}
                            >
                                {' '}
                            </Route>
                            <Route
                                path="/registration"
                                element={<RegistrationPage />}
                            />
                            <Route
                                path="/login"
                                element={<LoginPage setToken={setToken} />}
                            />
                            <Route path="/Profile" element={<ProfilePage />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
