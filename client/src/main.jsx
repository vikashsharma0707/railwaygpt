// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { Toaster } from 'react-hot-toast';
// import App from './App.jsx';
// import { AuthProvider } from './context/AuthContext.jsx';
// import { ThemeProvider } from './context/ThemeContext.jsx';
// import { SocketProvider } from './context/SocketContext.jsx';
// import './index.css';

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
// }

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <ThemeProvider>
//         <AuthProvider>
//           <SocketProvider>
//             <App />
//             <Toaster position="top-right" toastOptions={{ style: { background: '#0f172a', color: '#e2e8f0', border: '1px solid rgba(255,255,255,0.08)' } }} />
//           </SocketProvider>
//         </AuthProvider>
//       </ThemeProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { SocketProvider } from './context/SocketContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SocketProvider>
            <App />
            <Toaster 
              position="top-right" 
              toastOptions={{
                style: { 
                  background: '#0f172a', 
                  color: '#e2e8f0', 
                  border: '1px solid rgba(255,255,255,0.08)' 
                }
              }} 
            />
          </SocketProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);




