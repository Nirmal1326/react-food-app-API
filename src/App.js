
import { createContext, useState } from 'react';
import './App.css';
import ThemeButton from './component/theme-button';
import HomePage from './pages/homePage';

export const Themecontext = createContext(null);

function App() {
  const [theme, setTheme] = useState(false);
  return (
    <Themecontext.Provider value={{ theme, setTheme }}>
      <div className="App" style={theme ? { backgroundImage: "url(http://transparenttextures.com/patterns/diagmonds-light.png)" } : {}}>
        <ThemeButton />
        <HomePage />
      </div>
    </Themecontext.Provider>
  );
}

export default App;
