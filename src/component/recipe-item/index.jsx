import { useContext } from 'react';
import './style.css';
import { Themecontext } from '../../App';

const RecipeItem = (props) => {

    const { id, image, title, addToFav } = props;
    const {theme}=useContext(Themecontext);
    return (
        <div className="recipe-item" key={id} style={theme ? {backgroundColor: "#292929",
        backgroundImage: "url(http://transparenttextures.com/patterns/woven-light.png)",border: "10px solid rgb(33, 32, 32)"} : {}}>
            <div>
                <img src={image} alt="recipe-image" />
            </div>
            <p style={theme ? { color: "#dedbd8" } : {}}>
                {title}
            </p>
            <button type="button" style={theme ? { backgroundColor: "#3dce1d38" } : {}} onClick={addToFav}>Add to favorite 🤍</button>
        </div>
    );
}

export default RecipeItem;