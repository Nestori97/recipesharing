const express = require('express');
const app = express();
const cors = require('cors');
const recipesRouter = require('./Controllers/recipes');
const authRouter = require('./Controllers/auth');
const tagsRouter = require('./Controllers/tags');
app.get('/', (request, response) => {
    response.send('<h1>use /api/recipes to get info about recipes</h1>');
});
app.use(cors());
app.use(express.json());
app.use(express.static('dist'))
app.use('/api/recipes', recipesRouter);
app.use('/api/auth', authRouter);
app.use('/api/tags', tagsRouter);
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
