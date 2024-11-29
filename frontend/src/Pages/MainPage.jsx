import { useState, useEffect } from 'react';
import recipeService from '../Services/recipes.js';
import { RecipeCard } from '../Components/RecipeCard.jsx';
import { FilterList } from '../Components/FilterList.jsx';
import { SearchBar } from '../Components/SearchBar.jsx';
import tagServices from '../Services/tags.js';

const MainPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    useEffect(() => {
        recipeService.getAll().then((recipes) => setRecipes(recipes));
    }, []); // hakee kun sivu ladataan bakcendistä kaikki reseptit ja tallentaa ne recipes tilaan käyttäen react tilan käsiitely funktiota setRecipes
    const search = (query) => {
        //hakee bäkkäristä uudelleen reseptit ja filltteröi ne, tehty näin koska
        // jos recipes state täytyy korvata fillteröydyillä resepteillä jotta saat ne näkymään oikein
        recipeService.getAll().then((recipes) => {
            const searchedRecipes = recipes.filter((recipe) =>
                recipe.description.toLowerCase().includes(query.toLowerCase()),
            );
            setRecipes(searchedRecipes);
        });
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

            // Perform the filtering logic
            if (updatedTags.length > 0) {
                // Loop through each tag and fetch filtered recipes
                //chatgpt logiikkaa, en osannut saada toimimaan useammalla kuin yhdellä tagilla kerrallaan mut
                //tiesin et se tapahtuu looppaamalla kaikkien tagien yli ja ottamalla intersection
                //niistä resepteistä joten pyysin sitä tekemään sen ja kas toimi
                Promise.all(
                    updatedTags.map((tag) =>
                        tagServices.filterRecipesWithTags(tag),
                    ),
                )
                    .then((results) => {
                        // Intersect all recipe results by recipe.id
                        const intersectedRecipes = results.reduce(
                            (commonRecipes, recipesForTag) => {
                                return commonRecipes.filter((recipe) =>
                                    recipesForTag.some(
                                        (r) => r.id === recipe.id,
                                    ),
                                );
                            },
                        );

                        setRecipes(intersectedRecipes);
                    })
                    .catch((error) => {
                        console.error(
                            'Error fetching filtered recipes:',
                            error,
                        );
                    });
            } else {
                //jos ei valittuna tägejä näytä kaikki reseptit
                recipeService
                    .getAll()
                    .then((recipes) => setRecipes(recipes))
                    .catch((error) => {
                        console.error('Error fetching all recipes:', error);
                    });
            }

            return updatedTags; //lopuks päivitä tägien tila
        });
    };

    return (
        <div className="flex w-fit">
            {/* Filtering sidebar */}
            <div className="bg-accent w-80 p-4 flex flex-col rounded-3xl">
                <FilterList handleCheckboxChange={handleCheckboxChange} />
            </div>
            {/* Main content */}
            <div className="w-fit flex flex-wrap">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 px-4">
                    <div className="col-span-1 lg:col-span-2 xl:col-span-3 2xl:col-span-4">
                        <SearchBar search={search} />
                    </div>
                    {recipes.map((recipe) => (
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

export { MainPage };
