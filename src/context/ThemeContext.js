import React, { createContext, useState, useContext } from 'react';
import useWeb3Auth from '../hooks/usemetamask';

const ThemeContext = createContext();


export const useTheme = () => {
  return useContext(ThemeContext);
};


const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {user, handleSignIn, handleSignOut } = useWeb3Auth()
  const [ showLogin, setShowLogin ] = useState(false)

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleSidebarOpen = () => {
    setIsSidebarOpen(prevState => !prevState)
  }

  return (
    <ThemeContext.Provider 
      value={
        {theme, toggleTheme, isSidebarOpen, toggleSidebarOpen, user, handleSignIn, handleSignOut, showLogin, setShowLogin }
      }
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider
