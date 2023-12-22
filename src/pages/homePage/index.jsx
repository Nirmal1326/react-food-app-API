import { useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import Search from "../../component/search";
import './style.css';
import RecipeItem from "../../component/recipe-item";
import FavoriteItem from "../../component/favorite-item";
import { Themecontext } from "../../App";


const reducer = (state, action) => {
    switch (action.type) {
        case "filterFavorite":
            console.log(action);
            return {
                ...state,
                filteredValue: action.value,
            };
        default:
            return state;
    }
}
const initialstate = {
    filteredValue: "",
}
const HomePage = () => {

    const [loadingState, setLoadingState] = useState(false);
    const [receipe, setReceipe] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [apiSuccess, setApiSuccess] = useState(false);
    const [filteredstate, dispatch] = useReducer(reducer, initialstate);
    const { theme } = useContext(Themecontext);

    function getSearch(getData) {
        setLoadingState(true);
        //calling api
        async function getReceipes() {
            const apiResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=0c4538efe7c84aadb6d72c0d733b3644&query=${getData}`);
            const result = await apiResponse.json();
            const { results } = result;
            console.log(results);
            if (result && results.length > 0) {
                setLoadingState(false);
                setReceipe(results);
                setApiSuccess(true);
            }
        }
        getReceipes();
    }
    const addToFav = useCallback((getReceipesItem) => {
        let copyFavorite = [...favorites];
        const index = copyFavorite.findIndex(item => item.id === getReceipesItem.id);
        if (index === -1) {
            copyFavorite.push(getReceipesItem);
            setFavorites(copyFavorite);
            localStorage.setItem('favorites', JSON.stringify(copyFavorite));
            window.scrollTo({top :'0',behavior: 'smooth'})
        }
        else alert("Item already in Favorite List");
    }, [favorites])

    // function addToFav(getReceipesItem) {
    //     let copyFavorite = [...favorites];
    //     const index = copyFavorite.findIndex(item => item.id === getReceipesItem.id);
    //     if (index === -1) {
    //         copyFavorite.push(getReceipesItem);
    //         setFavorites(copyFavorite);
    //         localStorage.setItem('favorites', JSON.stringify(copyFavorite));
    //     }
    //     else alert("Item already in Favorite List");
    // }
    useEffect(() => {
        const ExtractFavFromLocalstorage = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(ExtractFavFromLocalstorage);
    }, [])

    function removeFromFav(getCurrentId) {
        let copyFavorite = [...favorites];
        copyFavorite = copyFavorite.filter((item) => item.id !== getCurrentId);
        setFavorites(copyFavorite);
        localStorage.setItem('favorites', JSON.stringify(copyFavorite));
    }

    const filteredfavoriteitem = favorites && favorites.length > 0 ? favorites.filter((item) =>
        item.title.toLowerCase().includes(filteredstate.filteredValue)
    ) : [];

    // const renderRecipe = useCallback(() => {
    //     if (receipe && receipe.length > 0) {
    //         return (receipe.map((item, index) => <RecipeItem addToFav={() => addToFav(item)} key={index} id={item.id} image={item.image} title={item.title} />));
    //     }
    // }, [receipe, addToFav])

    return (
        <div className="homepage">
            <Search getSearch={getSearch} apiSuccess={apiSuccess} setApiSuccess={setApiSuccess} />

            {/* show loading */}

            {loadingState && <div className="loader">Loading...</div>}


            {/* show Favorite Items */}

            <div className="favorites-wrapper">
                <h1 style={theme ? { color: "black" } : {}} className="favorites-title">Favorites</h1>
                <div className="search-favorites">
                    <input onChange={(event) => dispatch({ type: "filterFavorite", value: event.target.value })} value={filteredstate.filteredfavoriteitem} name="filterFavorite" placeholder="Search Favorites" style={theme ? { backgroundColor: "#16161671" } : {}}/>
                </div>
                <div className="favorites">
                    {filteredfavoriteitem && filteredfavoriteitem.length > 0
                        ? filteredfavoriteitem.map((item, index) => <FavoriteItem removeFromFav={() => removeFromFav(item.id)} key={index} id={item.id} image={item.image} title={item.title} />)
                        : null}
                </div>
                {
                    !filteredfavoriteitem.length && <div className="no-item" style={theme ? { color: "black" } : {}}>No Favorites added</div>
                }
            </div>

            <h1 style={theme ? { color: "black" } : {}} className="favorites-title">Search Result</h1>
            {/* Map througn all the recipes */}
            <div className="items">
                {useMemo(() => (
                    !loadingState && receipe && receipe.length > 0 ?
                        receipe.map((item, index) =>
                            <RecipeItem addToFav={() =>
                                addToFav(item)}
                                key={index} id={item.id} image={item.image} title={item.title} />)
                        : null
                ), [loadingState, addToFav, receipe])}
                {/* {renderRecipe()} */}
                {/* {receipe && receipe.length > 0
                    ? receipe.map((item, index) => <RecipeItem addToFav={() => addToFav(item)} key={index} id={item.id} image={item.image} title={item.title} />)
                    : null} */}
            </div>
            {!loadingState && !receipe.length && (
                <div className="no-item" style={theme ? { color: "black" } : {}}>No items found</div>
            )}
        </div>
    );
}

export default HomePage;