Create Table users(
    id Serial PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    Password TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    isAdmin Boolean
);
CREATE TABLE Recipe (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    description TEXT,
    ingredients JSON,
    instructions JSON,
    image TEXT,
    owner INTEGER REFERENCES users(id)
);
Create Table category (
    id SERIAL PRIMARY KEY,
    categoryName TEXT
);
Create Table tag (
    id SERIAL PRIMARY KEY,
    category_id INTEGER REFERENCES category(id),
    name TEXT
);
Create Table Rating(
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES Recipe(id),
    rating Integer,
    user_id INTEGER REFERENCES users(id)
);
Create Table comments(
    id Serial PRIMARY KEY,
    commentText TEXT,
    recipe_id INTEGER REFERENCES Recipe(id),
    user_id INTEGER REFERENCES users(id)
);
Create Table favoritedRecipes(
    user_id INTEGER REFERENCES users(id),
    recipe_id INTEGER REFERENCES Recipe(id)
);
Create Table RecipeTags(    
    recipe_id INTEGER REFERENCES Recipe(id),
    tag_id INTEGER REFERENCES tag(id)
);