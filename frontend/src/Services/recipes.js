import axios from 'axios';
const baseUrl = '/api/recipes';
const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};
const getOneRecipe = (id) => {
    const request = axios.get(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};
const addRecipe = (title, description, ingredients, instructions, image) => {
    return axios
        .post(
            baseUrl,
            { title, description, ingredients, instructions, image },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
        .then((response) => response.data)
        .catch((error) => {
            console.error('Error adding recipe:', error);
            throw error;
        });
};
const getRecipeComments = (id) => {
    const request = axios.get(`${baseUrl}/${id}/comments`);
    return request.then((response) => response.data);
};
const getUserRecipes = () => {
    return axios
        .get(`${baseUrl}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => response.data);
};
const getFavorite = (recipeID) => {
    return axios
        .get(`${baseUrl}/user/favorite/${recipeID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => response.data);
};
const setRecipeFavorite = (recipeID) => {
    return axios
        .post(
            `${baseUrl}/user/favorite/${recipeID}`,
            {}, // Empty body if no data is required
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            },
        )
        .then((response) => response.data);
};

const removeRecipeFromFavorites = (recipeID) => {
    return axios
        .delete(`${baseUrl}/user/favorite/${recipeID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => response.data);
};
const getAllFavoriteRecipes = () => {
    return axios
        .get(`${baseUrl}/user/favorites`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((response) => response.data);
};
export default {
    getAll,
    getOneRecipe,
    addRecipe,
    getRecipeComments,
    getUserRecipes,
    getFavorite,
    setRecipeFavorite,
    removeRecipeFromFavorites,
    getAllFavoriteRecipes,
};
