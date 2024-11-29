import axios from 'axios';
const baseUrl = '/api/tags';
const getAllTags = () => {
    const request = axios.get(`${baseUrl}`);
    return request.then((response) => response.data);
};
const filterRecipesWithTags = (tagName) => {
    const request = axios.get(`${baseUrl}/${tagName}`);
    return request.then((response) => response.data);
};
const addTagsToRecipe = (tags, recipeID) => {
    const request = axios.post(`${baseUrl}/${tags}/${recipeID}`);
    return request.then((response) => response.data);
};
const getTagsForRecipe = (recipeId) => {
    const request = axios.get(`${baseUrl}/recipe/${recipeId}`);
    return request.then((response) => response.data);
};
export default {
    getAllTags,
    filterRecipesWithTags,
    addTagsToRecipe,
    getTagsForRecipe,
};
