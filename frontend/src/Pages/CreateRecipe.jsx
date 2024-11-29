

import React, { useEffect, useState } from 'react';
import recipeService from '../Services/recipes';
import tagServices from '../Services/tags';

const CreateRecipe = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [ingredients, setIngredients] = useState([
        { ingredient: '', amount: '', unit: '' },
    ]);
    const [instructions, setInstructions] = useState([{ step: '' }]);
    const [tags, setTags] = useState([]);

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index][event.target.name] = event.target.value;
        setIngredients(newIngredients);
    };
    useEffect(() => {
        tagServices.getAllTags().then((tags) => setTags(tags));
    }, []); //hakee tagit/categoriat backendistä ja laittaa ne tilamuuttujaan
    const handleAddIngredient = () => {
        setIngredients([
            ...ingredients,
            { ingredient: '', amount: '', unit: '' },
        ]);
    };

    const handleInstructionChange = (index, event) => {
        const newInstructions = [...instructions];
        newInstructions[index].step = event.target.value;
        setInstructions(newInstructions);
    };

    const handleAddInstruction = () => {
        setInstructions([...instructions, { step: '' }]);
    };
    const handleCheckboxChange = async (tag) => {
        setSelectedTags((prevSelectedTags) => {
            const isSelected = prevSelectedTags.includes(tag);
            let updatedTags;
            if (!isSelected) {
                updatedTags = [...prevSelectedTags, tag];
            } else {
                updatedTags = prevSelectedTags.filter((t) => t !== tag);
            }

            return updatedTags; //lopuks päivitä tägien tila
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Convert ingredients to JSON string format
        const ingredientsJSON = JSON.stringify(ingredients);

        // Convert instructions to JSON string format with numbered steps
        const instructionsJSON = JSON.stringify(
            instructions.reduce((acc, instruction, index) => {
                acc[`step${index + 1}`] = instruction.step;
                return acc;
            }, {}),
        );

        // Send formatted data to recipe service



        const recipeID = await recipeService.addRecipe(
            title,
            description,
            ingredientsJSON,
            instructionsJSON,
            image,
        );
        selectedTags.map(
            (tag) => tagServices.addTagsToRecipe(tag.id, recipeID[0].id), // tee jokasesta tagista oma lähetys bäkkäriin jotta tägit päivittyvät oikein resepteihin
        );
        alert('Recipe submitted successfully!');
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    className="input input-bordered input-sm w-full max-w-xs m-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label>Image URL:</label>
                <input
                    type="text"
                    className="input input-bordered input-sm w-full max-w-xs m-1"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>

            <div>
                <h3>Description:</h3>
                <label></label>
                <textarea
                    className="textarea textarea-bordered textarea-xs w-full max-w-xs m-1"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <div>
                <h3>Ingredients</h3>
                {ingredients.map((ingredient, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full max-w-xs m-1"
                            name="ingredient"
                            placeholder="Ingredient"
                            value={ingredient.ingredient}
                            onChange={(e) => handleIngredientChange(index, e)}
                        />
                        <input
                            type="number"
                            className="input input-bordered input-sm w-full max-w-xs m-1"
                            name="amount"
                            placeholder="Amount"
                            value={ingredient.amount}
                            onChange={(e) => handleIngredientChange(index, e)}
                        />
                        <input
                            type="text"
                            className="input input-bordered input-sm w-full max-w-xs m-1"
                            name="unit"
                            placeholder="Unit"
                            value={ingredient.unit}
                            onChange={(e) => handleIngredientChange(index, e)}
                        />
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={handleAddIngredient}
                >
                    Add Ingredient
                </button>
            </div>

            <div>
                <h3>Instructions</h3>
                {instructions.map((instruction, index) => (
                    <div key={index}>
                        <textarea
                            placeholder={`Step ${index + 1}`}
                            value={instruction.step}
                            onChange={(e) => handleInstructionChange(index, e)}
                            className="textarea textarea-bordered textarea-sm w-full max-w-xs"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    className="btn btn-secondary m-3"
                    onClick={handleAddInstruction}
                >
                    Add Step
                </button>
            </div>
            <div>
                <h3>Choose tags for your recipe</h3>
                {tags.map((category) => (
                    <div key={category.category_id}>
                        <p className="text-lg font-bold">
                            {category.categoryname}
                        </p>
                        <div className="form-control">
                            {category.tags.map((tag) => (
                                <div key={tag.id}>
                                    <label className="label cursor-pointer justify-start flex gap-x-2">
                                        <input
                                            type="checkbox"
                                            className="checkbox"
                                            onChange={() =>
                                                handleCheckboxChange(tag)
                                            }
                                        />
                                        <span className="">{tag.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button type="submit" className="btn btn-accent m-2">
                Submit Recipe
            </button>
        </form>
    );
};

export { CreateRecipe };
