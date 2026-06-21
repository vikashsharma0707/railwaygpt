// // import { createContext, useContext, useEffect, useState } from 'react';

// // const ThemeContext = createContext({ theme: 'dark', toggle: () => {} });

// // export function ThemeProvider({ children }) {
// //   const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
// //   useEffect(() => {
// //     document.documentElement.classList.toggle('dark', theme === 'dark');
// //     localStorage.setItem('theme', theme);
// //   }, [theme]);
// //   return (
// //     <ThemeContext.Provider value={{ theme, toggle: () => setTheme((t) => t === 'dark' ? 'light' : 'dark') }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // }
// // export const useTheme = () => useContext(ThemeContext);



// import { createContext, useContext, useEffect, useState } from 'react';

// const ThemeContext = createContext({
//   theme: 'dark',
//   toggle: () => {}
// });

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(() => {
//     return localStorage.getItem('theme') || 'dark';
//   });

//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     localStorage.setItem('theme', theme);
//   }, [theme]);

//   const toggle = () => {
//     setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
//   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggle }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }

// export const useTheme = () => useContext(ThemeContext);
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};