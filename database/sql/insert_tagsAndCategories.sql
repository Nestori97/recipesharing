INSERT INTO category(categoryName)
VALUES ('diets');
INSERT INTO category(categoryName)
VALUES ('cuisine');
INSERT INTO category(categoryName)
VALUES ('mealtype');
INSERT INTO tag (category_id, name) VALUES (2, 'indian');
INSERT INTO tag (category_id, name) VALUES (2, 'Italian');
INSERT INTO tag (category_id, name) VALUES (1, 'vegetarian');
INSERT INTO tag (category_id, name) VALUES (1, 'vegan');
INSERT INTO tag (category_id, name) VALUES (1, 'Nut-free');
INSERT INTO tag (category_id, name) VALUES (3, '15min dinners');
INSERT INTO tag (category_id, name) VALUES (3, 'Desserts');
INSERT INTO tag (category_id, name) VALUES (3, 'Meal Prepping');
INSERT INTO RecipeTags(recipe_id, tag_id) VALUES (1, 2);
INSERT INTO RecipeTags(recipe_id, tag_id) VALUES (1, 8);
INSERT INTO RecipeTags(recipe_id, tag_id) VALUES (2, 2);