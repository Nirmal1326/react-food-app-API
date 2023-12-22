import { useContext } from 'react';
import './style.css'
import { Themecontext } from '../../App';

const ThemeButton = () => {
    const {theme,setTheme}=useContext(Themecontext);
    console.log(theme,setTheme);
    return ( 
        <button onClick={ () => setTheme(!theme)} style={theme ? { backgroundColor: "#111111a6", boxShadow: "rgb(20, 20, 20) 3px 4px 10px 5px"}  : {}}  className="themeButton">🌓</button>
     );
}
 
export default ThemeButton;