import { Link } from 'react-router-dom';

const RecipeCard = (props) => {
    return (
        <div className="card bg-secondary w-60 shadow-xl">
            <figure className="px-5 pt-5">
                <img
                    src={props.image_url}
                    alt="Picture of food"
                    className="rounded-xl w-[200px] h-[130px] object-cover"
                />
            </figure>
            <div className="card-body items-center text-center p-2">
                <h2 className="card-title">{props.title}</h2>
                <p className="card-description">{props.description}</p>
                <div className="card-actions">
                    <Link
                        to={`/recipe/${props.id}`}
                        className="btn btn-primary"
                    >
                        Open recipe
                    </Link>
                </div>
            </div>
        </div>
    );
};

export { RecipeCard };
