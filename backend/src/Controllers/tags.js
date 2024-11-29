const { request, response } = require('express');
const { Client } = require('pg');
const router = require('express').Router();
const DATABASE_URL = process.env.DATABASE_URL;

// Ensure DATABASE_URL is set
if (!DATABASE_URL) {
    console.error("Error: DATABASE_URL is not set in environment variables.");
    process.exit(1);
}
router.get('/', async (request, response) => {
    const client = new Client({ connectionString: DATABASE_URL })
    await client.connect();
    const tags = await client.query(
        `
      SELECT 
          category.id AS category_id,
          categoryName AS categoryname,
          JSON_AGG(
              JSON_BUILD_OBJECT(
                  'id', tag.id,
                  'name', tag.name
              )
          ) AS tags
      FROM category
      JOIN tag ON category.id = tag.category_id
      GROUP BY category.id, categoryName;
    `,
    );
    await client.end();
    response.json(tags.rows);
});

router.get('/:tag', async (request, response) => {
    const tag = request.params.tag;
    const client = new Client({ connectionString: DATABASE_URL })
    await client.connect();
    try {
        //kolmivaiheínen tietokantakysely
        // 1. hommaa tagin id tagin nimen perusteella
        const queryText = 'SELECT id FROM tag WHERE name = $1';
        const values = [tag];
        const resultFromTags = await client.query(queryText, values);
        if (resultFromTags.rows.length === 0) {
            return response.status(404).json({ error: 'Tag not found' });
        }
        const tagId = resultFromTags.rows[0].id;

        // 2. saa reseptien id jokka matchaa siihen tagin nimeen
        const queryText2 = 'SELECT recipe_id FROM RecipeTags WHERE tag_id = $1';
        values2 = [tagId];
        const recipeIdsResult = await client.query(queryText2, values2);
        const recipeIds = recipeIdsResult.rows.map((row) => row.recipe_id);
        if (recipeIds.length === 0) {
            return response.json([]);
        }

        // 3. hae kaikki reseptit joissa matchaava id
        const queryText3 = 'SELECT * FROM Recipe WHERE id = ANY($1::int[])';
        const values3 = [recipeIds];
        const recipesResult = await client.query(queryText3, values3);

        response.json(recipesResult.rows);
    } catch (error) {
        console.error('Error executing query', error);
        response.status(500).json({ error: 'Internal Server Error' });
    } finally {
        await client.end();
    }
});
router.post('/:tag/:id', async (request, response) => {
    const tag_id = request.params.tag;
    const recipe_id = request.params.id;
    const client = new Client({ connectionString: DATABASE_URL })
    await client.connect();
    try {
        const queryText = `
        INSERT INTO RecipeTags (recipe_id,tag_id)
        VALUES ($1, $2) 
    `;
        values = [recipe_id, tag_id];
        const recipeId = await client.query(queryText, values);
        response.status(201).json(recipeId.rows);
    } catch (error) {
        console.error('Error inserting tags to recipe:', error.message);
        response.status(500).json({ error: 'Failed to add tags to recipe' });
    } finally {
        await client.end();
    }
});
router.get('/recipe/:id', async (request, response) => {
    const recipe_id = request.params.id;
    const client = new Client({ connectionString: DATABASE_URL })
    try {
        await client.connect();
        const queryText1 = `SELECT tag_id FROM RecipeTags WHERE recipe_id = $1`;
        const tagIdsResult = await client.query(queryText1, [recipe_id]);
        const tag_ids = tagIdsResult.rows.map((row) => row.tag_id);
        if (tag_ids.length === 0) {
            return response.status(200).json({ tags: [] });
        }
        const queryText2 = `SELECT name FROM Tag WHERE id = ANY($1)`;
        const tagNamesResult = await client.query(queryText2, [tag_ids]);
        const tags = tagNamesResult.rows.map((row) => row.name);
        response.status(200).json({ tags });
    } catch (error) {
        console.error('Error getting tags:', error.message);
        response.status(500).json({ error: 'Failed to get tags' });
    } finally {
        await client.end();
    }
});

module.exports = router;
