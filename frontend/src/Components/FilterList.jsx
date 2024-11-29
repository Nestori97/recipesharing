import { useEffect, useState } from 'react';
import tagServices from '../Services/tags.js';
const FilterList = ({ handleCheckboxChange }) => {
    const [props, setProps] = useState([]);
    //hae tagit bäkkäristäö
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const alltags = await tagServices.getAllTags();

                const formattedProps = alltags.map((category) => ({
                    category: category.categoryname,
                    tags: category.tags.map((tag) => tag.name), // data oikeaan muotoon
                }));

                setProps(formattedProps);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);

    return (
        <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium">
                Filter Recipes
            </div>
            <div className="collapse-content">
                {props.map((item, index) => (
                    <div key={index}>
                        <p className="text-lg font-bold">{item.category}</p>
                        <div className="form-control">
                            {item.tags.map((tag, tagIndex) => (
                                <label
                                    key={tagIndex}
                                    className="label cursor-pointer justify-start flex gap-x-2"
                                >
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        onChange={() =>
                                            handleCheckboxChange(tag)
                                        }
                                    />
                                    <span>{tag}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export { FilterList };
