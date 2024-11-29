import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import recipeService from '../Services/recipes.js';
import tagService from '../Services/tags.js';
import { CommentCard } from '../Components/CommentCard.jsx';
const RecipePage = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [tags, setTags] = useState([]);
    const token = localStorage.getItem('token');
    const [favorite, setFavorite] = useState(false);
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const fetchedRecipe = await recipeService.getOneRecipe(id);
                const recipeData = fetchedRecipe[0];

                // Ensure `ingredients` and `instructions` are parsed into JavaScript structures
                const parsedIngredients =
                    typeof recipeData.ingredients === 'string'
                        ? JSON.parse(recipeData.ingredients)
                        : recipeData.ingredients;

                const parsedInstructions =
                    typeof recipeData.instructions === 'string'
                        ? JSON.parse(recipeData.instructions)
                        : recipeData.instructions;

                const recipeWithCorrectInfo = {
                    ...recipeData,
                    ingredients: parsedIngredients, // Ensure it's an array
                    instructions: parsedInstructions, // Ensure it's an object
                    creator: 'Matti',
                };
                const Alltags = await tagService.getTagsForRecipe(id);
                setTags(Alltags.tags);
                setRecipe(recipeWithCorrectInfo);
                const recipeComments =
                    await recipeService.getRecipeComments(id);
                setComments(recipeComments);
                const favoriteFromDatabase =
                    await recipeService.getFavorite(id);
                if (favoriteFromDatabase.length !== 0) setFavorite(true);
            } catch (error) {
                console.error('Error fetching recipe:', error);
            }
        };

        if (id) {
            //if there is an id fetch the recipedata
            fetchRecipe();
        }
    }, [id]);
    const handleRecipeFavoriteChange = async () => {
        const newFavorite = !favorite; // Optimistic update
        setFavorite(newFavorite);

        if (newFavorite) {
            await recipeService.setRecipeFavorite(id);
        } else {
            await recipeService.removeRecipeFromFavorites(id);
        }
    };
    const showButtonText = () => {
        if (favorite) {
            return <div>Unfavorite</div>;
        } else {
            return <div>Favorite</div>;
        }
    };
    if (!recipe) {
        return <p>Loading recipe data</p>; // while loading show this page
    }
    return (
        <div className="flex flex-wrap w-fill px-4 gap-8">
            {/* Photo and info */}
            <div className="grid grid-cols-6 p-4 bg-accent rounded-xl gap-4">
                <img
                    src={recipe.image}
                    alt="Picture of food"
                    className="rounded-xl col-span-3"
                />
                <div className="col-span-2">
                    <h2 className="text-3xl font-bold">{recipe.title}</h2>
                    <p>{recipe.description}</p>
                    <p>Created by {recipe.creator}</p>
                    {token && (
                        <button
                            className="btn"
                            onClick={handleRecipeFavoriteChange}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            {showButtonText()}
                        </button>
                    )}
                </div>
                <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-bold">Tags</h3>
                    {tags.map((tag) => (
                        <div className="badge badge-outline badge-lg" key={tag}>
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            {/* Ingredients and instructions */}
            <div className="grid grid-cols-2 w-full">
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold py-4">Ingredients</h3>
                    {recipe.ingredients.map(({ ingredient, amount, unit }) => (
                        <p key={ingredient}>
                            {amount} {unit} {ingredient}
                        </p>
                    ))}
                </div>
                <div>
                    <ul className="steps steps-vertical">
                        {Object.entries(recipe.instructions).map(
                            ([key, instruction]) => (
                                <li className="step step-primary" key={key}>
                                    {instruction}
                                </li>
                            ),
                        )}
                    </ul>
                </div>
            </div>
            {comments.map((comment) => (
                <div> {CommentCard(comment)} </div>
            ))}
        </div>
    );
};

export { RecipePage };
