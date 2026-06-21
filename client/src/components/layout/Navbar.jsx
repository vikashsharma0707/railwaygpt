// // import { Link, NavLink, useNavigate } from 'react-router-dom';
// // import { FiBell, FiLogOut, FiUser, FiMenu } from 'react-icons/fi';
// // import { useState } from 'react';
// // import { useAuth } from '../../context/AuthContext.jsx';

// // const tab = ({ isActive }) =>
// //   `px-3 py-2 rounded-lg text-sm ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:text-white hover:bg-white/5'}`;

// // export default function Navbar() {
// //   const { user, logout } = useAuth();
// //   const [open, setOpen] = useState(false);
// //   const nav = useNavigate();

// //   return (
// //     <header className="sticky top-0 z-40 backdrop-blur bg-slate-950/70 border-b border-white/10">
// //       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
// //         <Link to="/" className="flex items-center gap-2 font-bold text-lg">
// //           <span className="inline-block w-7 h-7 rounded-md bg-gradient-to-br from-brand-500 to-fuchsia-500" />
// //           RailwayGPT<span className="text-brand-500">.AI</span>
// //         </Link>
// //         <nav className="hidden md:flex items-center gap-1 ml-6">
// //           <NavLink to="/trains" className={tab}>Trains</NavLink>
// //           <NavLink to="/pnr" className={tab}>PNR</NavLink>
// //           <NavLink to="/assistant" className={tab}>AI Assistant</NavLink>
// //           {user && <NavLink to="/tickets" className={tab}>My Tickets</NavLink>}
// //           {user?.role === 'admin' && <NavLink to="/admin" className={tab}>Admin</NavLink>}
// //         </nav>
// //         <div className="ml-auto flex items-center gap-2">
// //           {user ? (
// //             <>
// //               <Link to="/notifications" className="btn-ghost p-2"><FiBell /></Link>
// //               <Link to="/profile" className="btn-ghost p-2"><FiUser /></Link>
// //               <button onClick={() => { logout(); nav('/'); }} className="btn-ghost p-2"><FiLogOut /></button>
// //             </>
// //           ) : (
// //             <>
// //               <Link to="/login" className="btn-ghost">Login</Link>
// //               <Link to="/register" className="btn-primary">Get Started</Link>
// //             </>
// //           )}
// //           <button className="md:hidden btn-ghost p-2" onClick={() => setOpen(!open)}><FiMenu /></button>
// //         </div>
// //       </div>
// //       {open && (
// //         <div className="md:hidden border-t border-white/10 px-4 py-3 flex flex-col gap-1">
// //           <NavLink to="/trains" className={tab} onClick={() => setOpen(false)}>Trains</NavLink>
// //           <NavLink to="/pnr" className={tab} onClick={() => setOpen(false)}>PNR</NavLink>
// //           <NavLink to="/assistant" className={tab} onClick={() => setOpen(false)}>AI Assistant</NavLink>
// //           {user && <NavLink to="/tickets" className={tab} onClick={() => setOpen(false)}>My Tickets</NavLink>}
// //           {user?.role === 'admin' && <NavLink to="/admin" className={tab} onClick={() => setOpen(false)}>Admin</NavLink>}
// //         </div>
// //       )}
// //     </header>
// //   );
// // }



// import { Link, NavLink, useNavigate } from 'react-router-dom';
// import { FiBell, FiLogOut, FiUser, FiMenu } from 'react-icons/fi';
// import { useState } from 'react';
// import { useAuth } from '../../context/AuthContext.jsx';

// const navLinkClass = ({ isActive }) =>
//   `px-4 py-2 rounded-xl text-sm font-medium transition-all ${
//     isActive 
//       ? 'bg-white/10 text-white shadow-sm' 
//       : 'text-slate-300 hover:text-white hover:bg-white/5'
//   }`;

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setMobileOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/10">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 font-bold text-xl">
//           <span className="inline-block w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500" />
//           RailwayGPTuhjhjhbjh<span className="text-violet-400">.AI</span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center gap-1 ml-8">
//           <NavLink to="/trains" className={navLinkClass}>Trains</NavLink>
//           <NavLink to="/pnr" className={navLinkClass}>PNR</NavLink>
//           <NavLink to="/assistant" className={navLinkClass}>AI Assistant</NavLink>
//           {user && <NavLink to="/tickets" className={navLinkClass}>My Tickets</NavLink>}
          
//           {user?.role === 'admin' && (
//             <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
//           )}
//         </nav>

//         {/* Right Side */}
//         <div className="ml-auto flex items-center gap-2">
//           {user ? (
//             <>
//               <Link to="/notifications" className="p-3 hover:bg-white/5 rounded-xl transition">
//                 <FiBell size={20} />
//               </Link>
//               <Link to="/profile" className="p-3 hover:bg-white/5 rounded-xl transition">
//                 <FiUser size={20} />
//               </Link>
//               <button 
//                 onClick={handleLogout}
//                 className="p-3 hover:bg-white/5 rounded-xl transition text-red-400 hover:text-red-300"
//               >
//                 <FiLogOut size={20} />
//               </button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="px-5 py-2 text-slate-300 hover:text-white">Login</Link>
//               <Link to="/register" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 rounded-xl font-medium">Get Started</Link>
//             </>
//           )}

//           {/* Mobile Menu Button */}
//           <button 
//             className="md:hidden p-3 hover:bg-white/5 rounded-xl transition"
//             onClick={() => setMobileOpen(!mobileOpen)}
//           >
//             <FiMenu size={22} />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <div className="md:hidden border-t border-white/10 bg-slate-950/95 px-4 py-4 flex flex-col gap-2">
//           <NavLink to="/trains" className={navLinkClass} onClick={() => setMobileOpen(false)}>Trainsjjhjhjh</NavLink>
//           <NavLink to="/pnr" className={navLinkClass} onClick={() => setMobileOpen(false)}>PNR</NavLink>
//           <NavLink to="/assistant" className={navLinkClass} onClick={() => setMobileOpen(false)}>AI Assistantgyugjgyhg</NavLink>
//           {user && <NavLink to="/tickets" className={navLinkClass} onClick={() => setMobileOpen(false)}>My Tickets</NavLink>}
          
//           {user?.role === 'admin' && (
//             <NavLink to="/admin" className={navLinkClass} onClick={() => setMobileOpen(false)}>Adminhjghjgh</NavLink>
//           )}

//           {user && (
//             <button 
//               onClick={handleLogout}
//               className="mt-4 text-red-400 hover:text-red-300 text-left px-4 py-3"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }






import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FiBell, FiLogOut, FiUser, FiMenu } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-xl text-sm font-medium transition-all ${
    isActive 
      ? 'bg-white/10 text-white shadow-sm' 
      : 'text-slate-300 hover:text-white hover:bg-white/5'
  }`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="inline-block w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500" />
          Railway<span className="text-violet-400">GPT</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 ml-8">
          <NavLink to="/trains" className={navLinkClass}>Trains</NavLink>
           <NavLink to="/trainsSearch" className={navLinkClass}>TrainsSearch</NavLink>
          <NavLink to="/pnr" className={navLinkClass}>PNR</NavLink>
          <NavLink to="/assistant" className={navLinkClass}>AI Assistant</NavLink>
          
          {user && (
            <NavLink to="/tickets" className={navLinkClass}>My Tickets</NavLink>
          )}
          
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={navLinkClass}>Admin</NavLink>
          )}
        </nav>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-2">
          {user ? (
            <>
              <Link to="/notifications" className="p-3 hover:bg-white/5 rounded-xl transition">
                <FiBell size={20} />
              </Link>
              <Link to="/profile" className="p-3 hover:bg-white/5 rounded-xl transition">
                <FiUser size={20} />
              </Link>
              <button 
                onClick={handleLogout}
                className="p-3 hover:bg-white/5 rounded-xl transition text-red-400 hover:text-red-300"
              >
                <FiLogOut size={20} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-5 py-2 text-slate-300 hover:text-white">Login</Link>
              <Link to="/register" className="px-5 py-2 bg-violet-600 hover:bg-violet-700 rounded-xl font-medium">Get Started</Link>
            </>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-3 hover:bg-white/5 rounded-xl transition"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <FiMenu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/10 bg-slate-950/95 px-4 py-4 flex flex-col gap-2">
          <NavLink 
            to="/trains" 
            className={navLinkClass} 
            onClick={() => setMobileOpen(false)}
          >
            Trains
          </NavLink>
          
          <NavLink 
            to="/pnr" 
            className={navLinkClass} 
            onClick={() => setMobileOpen(false)}
          >
            PNR
          </NavLink>
          
          <NavLink 
            to="/assistant" 
            className={navLinkClass} 
            onClick={() => setMobileOpen(false)}
          >
            AI Assistant
          </NavLink>
          
          {user && (
            <NavLink 
              to="/tickets" 
              className={navLinkClass} 
              onClick={() => setMobileOpen(false)}
            >
              My Tickets
            </NavLink>
          )}
          
          {user?.role === 'admin' && (
            <NavLink 
              to="/admin" 
              className={navLinkClass} 
              onClick={() => setMobileOpen(false)}
            >
              Admin
            </NavLink>
          )}

          {user && (
            <button 
              onClick={handleLogout}
              className="mt-4 text-red-400 hover:text-red-300 text-left px-4 py-3"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}