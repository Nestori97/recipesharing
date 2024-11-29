const { request, response } = require('express');
const pg = require('pg');
const { getUserFromToken } = require('../Utils/auth');
const router = require('express').Router();
const { Pool, Client } = pg;

router.get('/', async (request, response) => {
    const client = new Client();
    await client.connect();
    const recipes = await client.query('SELECT * FROM recipe');
    await client.end();
    response.json(recipes.rows);
});
router.get('/user', async (request, response) => {
    const user = getUserFromToken(request);
    if (!user) {
        return response.status(401).json({ error: 'Authentication failed' });
    }
    const client = new Client();
    await client.connect();
    try {
        const queryText = `
            SELECT * FROM Recipe WHERE owner = $1
        `;
        const values = [user.id];
        const recipes = await client.query(queryText, values);
        response.status(200).json(recipes.rows);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        response.status(500).json({ error: 'Failed to fetch recipes' });
    } finally {
        await client.end();
    }
});
router.get('/user/favorites', async (request, response) => {
    const user = getUserFromToken(request);
    if (!user) {
        return response.status(401).json({ error: 'Authentication failed' });
    }
    const client = new Client();
    await client.connect();
    try {
        const queryText = `
        SELECT r.*
        FROM Recipe r
        INNER JOIN favoritedRecipes fr
        ON r.id = fr.recipe_id
        WHERE fr.user_id = $1
    `;
        const values = [user.id];
        const recipesIds = await client.query(queryText, values);
        response.status(200).json(recipesIds.rows);
    } catch (error) {
        console.error('Error fetching favorite recipes:', error.message);
        response
            .status(500)
            .json({ error: 'Failed to fetch favorite recipes' });
    } finally {
        await client.end();
    }
});
router.get('/user/favorite/:id', async (request, response) => {
    const user = getUserFromToken(request);
    if (!user) {
        return response.status(401).json({ error: 'Authentication failed' });
    }
    const recipe_id = request.params.id;
    const client = new Client();
    await client.connect();
    try {
        const queryText = `
            SELECT * FROM favoritedRecipes WHERE user_id = $1 AND recipe_id = $2
        `;
        const values = [user.id, recipe_id];
        const favorite = await client.query(queryText, values);
        response.status(200).json(favorite.rows);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        response.status(500).json({ error: 'Failed to fetch recipes' });
    } finally {
        await client.end();
    }
});
router.post('/user/favorite/:id', async (request, response) => {
    const user = getUserFromToken(request);
    if (!user) {
        return response.status(401).json({ error: 'Authentication failed' });
    }
    const recipe_id = request.params.id;
    const client = new Client();
    await client.connect();
    try {
        const queryText = `
             INSERT INTO favoritedRecipes (user_id, recipe_id)
              VALUES ($1, $2)
        `;
        const values = [user.id, recipe_id];
        const favorite = await client.query(queryText, values);
        response.status(200).json(favorite.rows);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        response.status(500).json({ error: 'Failed to fetch recipes' });
    } finally {
        await client.end();
    }
});
router.delete('/user/favorite/:id', async (request, response) => {
    const user = getUserFromToken(request);
    if (!user) {
        return response.status(401).json({ error: 'Authentication failed' });
    }
    const recipe_id = request.params.id;
    const client = new Client();
    await client.connect();
    try {
        const queryText = `
        DELETE FROM favoritedRecipes 
        WHERE user_id = $1 AND recipe_id = $2
    `;
        const values = [user.id, recipe_id];
        const favorite = await client.query(queryText, values);
        response.status(200).json(favorite.rows);
    } catch (error) {
        console.error('Error fetching recipes:', error.message);
        response.status(500).json({ error: 'Failed to fetch recipes' });
    } finally {
        await client.end();
    }
});
router.get('/:id', async (request, response) => {
    const client = new Client();
    const id = request.params.id;
    await client.connect();
    const queryText = 'SELECT * FROM recipe WHERE id = $1';
    const values = [id];
    const recipe = await client.query(queryText, values);
    response.json(recipe.rows);
});
router.post('/', async (request, response) => {
    const user = getUserFromToken(request);
    if (!user) {
        return response.status(401).json({ error: 'Authentication failed' });
    }

    const client = new Client();
    await client.connect();
    try {
        const { title, description, ingredients, instructions, image } =
            request.body;
        const queryText = `
            INSERT INTO Recipe (title, description, ingredients, instructions, image, owner)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
        `;
        /// todo values validaatio
        const values = [
            title,
            description,
            JSON.stringify(ingredients),
            JSON.stringify(instructions),
            image,
            user.id,
        ];

        const recipeId = await client.query(queryText, values);
        response.status(201).json(recipeId.rows);
    } catch (error) {
        console.error('Error inserting recipe:', error.message);
        response.status(500).json({ error: 'Failed to add recipe' });
    } finally {
        await client.end();
    }
});
router.get('/:id/comments', async (request, response) => {
    const client = new Client();
    const id = request.params.id;
    await client.connect();
    const queryText = 'SELECT * FROM comments WHERE recipe_id = $1';
    const values = [id];
    const recipe = await client.query(queryText, values);
    response.json(recipe.rows);
});
module.exports = router;
