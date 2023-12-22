import { useContext } from 'react';
import './style.css';
import { Themecontext } from '../../App';

const FavoriteItem = (props) => {

    const { id, image, title, removeFromFav} = props;
    const {theme}=useContext(Themecontext);
    return (
        <div className="favorite-item" key={id} style={theme ? {backgroundColor: "#292929",
            backgroundImage: "url(http://transparenttextures.com/patterns/woven-light.png)",border: "10px solid rgb(33, 32, 32)"} : {}}>
            <div>
                <img src={image} alt="recipe-image" />
            </div>
            <p style={theme ? { color: "#dedbd8" } : {}}>
                {title}
            </p>
            <button type="button" style={theme ? { backgroundColor: " #cd244038", color:"#dedbd8"} : {}} onClick={removeFromFav}>Remove from favorite 🗑️</button>
        </div>
    );
}

export default FavoriteItem;