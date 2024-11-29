import { useState, useEffect } from 'react';
import recipeService from '../Services/recipes.js';
import { RecipeCard } from '../Components/RecipeCard.jsx';
const ProfilePage = () => {
    const [userRecipes, SetuserRecipes] = useState([]);
    const [favoriteRecipes, setfavoriteRecipes] = useState([]);
    useEffect(() => {
        const fetchRecipes = async () => {
            const recipes = await recipeService.getUserRecipes();
            SetuserRecipes(recipes);
            const favorites = await recipeService.getAllFavoriteRecipes();
            setfavoriteRecipes(favorites);
        };
        fetchRecipes();
    }, []);
    return (
        <div>
            <h1>Your own recipes</h1>
            <div className="w-fit flex flex-wrap">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4">
                    {userRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            description={recipe.description}
                            image_url={recipe.image}
                        />
                        // käy kaikki tilassa recipes olevat reseptit läpi ja luo jokaisesta reseptistä olevilla tiedoilla oman RecipeCard componentin
                    ))}
                </div>
            </div>
            <h2>And here are your favorite recipes</h2>
            <div className="w-fit flex flex-wrap">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4">
                    {favoriteRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            title={recipe.title}
                            description={recipe.description}
                            image_url={recipe.image}
                        />
                        // käy kaikki tilassa recipes olevat reseptit läpi ja luo jokaisesta reseptistä olevilla tiedoilla oman RecipeCard componentin
                    ))}
                </div>
            </div>
        </div>
    );
};
export { ProfilePage };
