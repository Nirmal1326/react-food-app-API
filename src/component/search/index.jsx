import { useContext, useEffect, useState } from 'react';
import './style.css';
import { Themecontext } from '../../App';

const Search = (props) => {
    const { getSearch, apiSuccess, setApiSuccess } = props;
    const [inputValue, setInputValue] = useState('');
    const {theme}=useContext(Themecontext);
    function handleInputValue(event) {
        const { value } = event.target;
        setInputValue(value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        getSearch(inputValue);
    }
    useEffect(() => {
        if (apiSuccess) {
            setInputValue('');
            setApiSuccess(false);
        }
    }, [apiSuccess,setApiSuccess])
    return (
        <form onClick={handleSubmit} className="search">
            <input name="search" placeholder="Search Recipes" id="submit" value={inputValue} onChange={handleInputValue} style={theme ? { backgroundColor: "#16161671" } : {}}/>
            <button style={theme ? { backgroundColor: "#11111155" } : {}} type="submit">search</button>
        </form>
    );
}

export default Search;