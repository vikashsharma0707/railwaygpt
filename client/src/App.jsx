// // import { Routes, Route, Navigate } from 'react-router-dom';
// // import Layout from './components/layout/Layout.jsx';
// // import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
// // import Landing from './pages/Landing.jsx';
// // import Login from './pages/auth/Login.jsx';
// // import Register from './pages/auth/Register.jsx';
// // import ForgotPassword from './pages/auth/ForgotPassword.jsx';
// // import ResetPassword from './pages/auth/ResetPassword.jsx';
// // import Dashboard from './pages/user/Dashboard.jsx';
// // import TrainSearch from './pages/user/TrainSearch.jsx';
// // import TrainDetails from './pages/user/TrainDetails.jsx';
// // import Booking from './pages/user/Booking.jsx';
// // import Payment from './pages/user/Payment.jsx';
// // import PaymentSuccess from './pages/user/PaymentSuccess.jsx';
// // import PaymentFailure from './pages/user/PaymentFailure.jsx';
// // import MyTickets from './pages/user/MyTickets.jsx';
// // import PNRStatus from './pages/user/PNRStatus.jsx';
// // import TripPlanner from './pages/user/TripPlanner.jsx';
// // import AIAssistant from './pages/user/AIAssistant.jsx';
// // import Profile from './pages/user/Profile.jsx';
// // import Notifications from './pages/user/Notifications.jsx';
// // import AdminDashboard from './pages/admin/AdminDashboard.jsx';
// // import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';
// // import AdminTrains from './pages/admin/AdminTrains.jsx';
// // import AdminUsers from './pages/admin/AdminUsers.jsx';
// // import AdminBookings from './pages/admin/AdminBookings.jsx';
// // import AdminKnowledge from './pages/admin/AdminKnowledge.jsx';
// // import AdminAgents from './pages/admin/AdminAgents.jsx';
// // import NotFound from './pages/NotFound.jsx';
// // import Trains from './pages/Trains.jsx';
// // import AdminLayout from './components/layout/AdminLayout.jsx';
// // import TatkalBooking from './pages/user/TatkalBooking.jsx';

// // export default function App() {
// //   return (
// //     <Routes>
// //       <Route element={<Layout />}>
// //         <Route index element={<Landing />} />
// //         <Route path="login" element={<Login />} />
// //         <Route path="register" element={<Register />} />
// //         <Route path="forgot-password" element={<ForgotPassword />} />
// //         <Route path="reset-password" element={<ResetPassword />} />

// //         <Route path="trainsSearch" element={<TrainSearch />} />
// //         <Route path="trainsSearch/:id" element={<TrainDetails />} />
// //         <Route path="pnr" element={<PNRStatus />} />
// //         <Route path="assistant" element={<AIAssistant />} />

// //         <Route path="/trains" element={<Trains/>} />
// // <Route path="/admin/trains" element={<Trains isAdmin={true} />} />

// //         <Route element={<ProtectedRoute />}>
// //           <Route path="dashboard" element={<Dashboard />} />
// //           <Route path="book/:trainId" element={<Booking />} />
// //           <Route path="pay/:bookingId" element={<Payment />} />
// //           <Route path="tatkal/:trainId" element={<TatkalBooking/>} />
// //           <Route path="payment/success" element={<PaymentSuccess />} />
// //           <Route path="payment/failure" element={<PaymentFailure />} />
// //           <Route path="tickets" element={<MyTickets />} />
// //           <Route path="trip-planner" element={<TripPlanner />} />
// //           <Route path="profile" element={<Profile />} />
// //           <Route path="notifications" element={<Notifications />} />
// //         </Route>

// //         {/* <Route element={<ProtectedRoute role="admin" />}>
// //           <Route path="admin" element={<AdminDashboard />} />
// //           <Route path="admin/analytics" element={<AdminAnalytics />} />
// //           <Route path="admin/trains" element={<AdminTrains />} />
// //           <Route path="admin/users" element={<AdminUsers />} />
// //           <Route path="admin/bookings" element={<AdminBookings />} />
// //           <Route path="admin/knowledge" element={<AdminKnowledge />} />
// //           <Route path="admin/agents" element={<AdminAgents />} />
// //         </Route> */}


// //         {/* Protected Admin Routes */}
// // <Route element={<ProtectedRoute role="admin" />}>
// //   <Route path="admin" element={<AdminLayout/>}>
// //     <Route index element={<AdminDashboard />} />
// //     <Route path="analytics" element={<AdminAnalytics />} />
// //     <Route path="admintrains" element={<AdminTrains />} />
// //     <Route path="users" element={<AdminUsers />} />
// //     <Route path="bookings" element={<AdminBookings />} />
// //     <Route path="knowledge" element={<AdminKnowledge />} />
// //     <Route path="agents" element={<AdminAgents />} />
// //     {/* <Route path="activity" element={<ActivityFeed />} />
// //     <Route path="quick-actions" element={<QuickActions />} /> */}
// //   </Route>
// // </Route>

// //         <Route path="*" element={<NotFound />} />
// //       </Route>
// //     </Routes>
// //   );
// // }






// import { Routes, Route } from 'react-router-dom';
// import Layout from './components/layout/Layout.jsx';
// import ProtectedRoute from './components/layout/ProtectedRoute.jsx';
// import AdminLayout from './components/layout/AdminLayout.jsx';

// import Landing from './pages/Landing.jsx';
// import Login from './pages/auth/Login.jsx';
// import Register from './pages/auth/Register.jsx';
// import ForgotPassword from './pages/auth/ForgotPassword.jsx';
// import ResetPassword from './pages/auth/ResetPassword.jsx';

// import Dashboard from './pages/user/Dashboard.jsx';
// import TrainSearch from './pages/user/TrainSearch.jsx';
// import TrainDetails from './pages/user/TrainDetails.jsx';
// import Booking from './pages/user/Booking.jsx';
// import Payment from './pages/user/Payment.jsx';
// import PaymentSuccess from './pages/user/PaymentSuccess.jsx';
// import PaymentFailure from './pages/user/PaymentFailure.jsx';
// import MyTickets from './pages/user/MyTickets.jsx';
// import PNRStatus from './pages/user/PNRStatus.jsx';
// import TripPlanner from './pages/user/TripPlanner.jsx';
// import AIAssistant from './pages/user/AIAssistant.jsx';
// import Profile from './pages/user/Profile.jsx';
// import Notifications from './pages/user/Notifications.jsx';
// import TatkalBooking from './pages/user/TatkalBooking.jsx';
// import Trains from './pages/Trains.jsx';

// import AdminDashboard from './pages/admin/AdminDashboard.jsx';
// import AdminAnalytics from './pages/admin/AdminAnalytics.jsx';
// import AdminTrains from './pages/admin/AdminTrains.jsx';
// import AdminUsers from './pages/admin/AdminUsers.jsx';
// import AdminBookings from './pages/admin/AdminBookings.jsx';
// import AdminKnowledge from './pages/admin/AdminKnowledge.jsx';
// import AdminAgents from './pages/admin/AdminAgents.jsx';

// import NotFound from './pages/NotFound.jsx';

// export default function App() {
//   return (
//     <Routes>
//       <Route element={<Layout />}>

//         {/* ── Public routes ──────────────────────────────────────────── */}
//         <Route index element={<Landing />} />
//         <Route path="login"          element={<Login />} />
//         <Route path="register"       element={<Register />} />
//         <Route path="forgot-password" element={<ForgotPassword />} />
//         <Route path="reset-password" element={<ResetPassword />} />

//         <Route path="trainsSearch"      element={<TrainSearch />} />
//         <Route path="trainsSearch/:id"  element={<TrainDetails />} />
//         <Route path="pnr"               element={<PNRStatus />} />
//         <Route path="assistant"         element={<AIAssistant />} />
//         <Route path="trains"            element={<Trains />} />

//         {/* ── Protected user routes ──────────────────────────────────── */}
//         <Route element={<ProtectedRoute />}>
//           <Route path="dashboard"          element={<Dashboard />} />
//           <Route path="book/:trainId"      element={<Booking />} />
//           <Route path="pay/:bookingId"     element={<Payment />} />
//           <Route path="tatkal/:trainId"    element={<TatkalBooking />} />
//           <Route path="payment/success"    element={<PaymentSuccess />} />
//           <Route path="payment/failure"    element={<PaymentFailure />} />
//           <Route path="tickets"            element={<MyTickets />} />
//           <Route path="trip-planner"       element={<TripPlanner />} />
//           <Route path="profile"            element={<Profile />} />
//           <Route path="notifications"      element={<Notifications />} />
//         </Route>

//         {/* ── Protected admin routes (nested under AdminLayout) ──────── */}
//         <Route element={<ProtectedRoute role="admin" />}>
//           <Route path="admin" element={<AdminLayout />}>
//             <Route index                    element={<AdminDashboard />} />
//             <Route path="analytics"         element={<AdminAnalytics />} />
//             <Route path="trains"            element={<AdminTrains />} />
//             <Route path="users"             element={<AdminUsers />} />
//             <Route path="bookings"          element={<AdminBookings />} />
//             <Route path="knowledge"         element={<AdminKnowledge />} />
//             <Route path="agents"            element={<AdminAgents />} />
//           </Route>
//         </Route>

//         <Route path="*" element={<NotFound />} />
//       </Route>
//     </Routes>
//   );

// }



import { Routes, Route } from 'react-router-dom';

// ── Layouts ──────────────────────────────────────────────────────────────────
import Layout          from './components/layout/Layout.jsx';
import AdminLayout     from './components/layout/AdminLayout.jsx';
import ProtectedRoute  from './components/layout/ProtectedRoute.jsx';

// ── Public / User pages ───────────────────────────────────────────────────────
import Landing         from './pages/Landing.jsx';
import Login           from './pages/auth/Login.jsx';
import Register        from './pages/auth/Register.jsx';
import ForgotPassword  from './pages/auth/ForgotPassword.jsx';
import ResetPassword   from './pages/auth/ResetPassword.jsx';
import Trains          from './pages/Trains.jsx';
import TrainSearch     from './pages/user/TrainSearch.jsx';
import TrainDetails    from './pages/user/TrainDetails.jsx';
import PNRStatus       from './pages/user/PNRStatus.jsx';
import AIAssistant     from './pages/user/AIAssistant.jsx';
import Dashboard       from './pages/user/Dashboard.jsx';
import Booking         from './pages/user/Booking.jsx';
import Payment         from './pages/user/Payment.jsx';
import PaymentSuccess  from './pages/user/PaymentSuccess.jsx';
import PaymentFailure  from './pages/user/PaymentFailure.jsx';
import MyTickets       from './pages/user/MyTickets.jsx';
import TripPlanner     from './pages/user/TripPlanner.jsx';
import Profile         from './pages/user/Profile.jsx';
import Notifications   from './pages/user/Notifications.jsx';
import TatkalBooking   from './pages/user/TatkalBooking.jsx';
import NotFound        from './pages/NotFound.jsx';

// ── Admin pages ───────────────────────────────────────────────────────────────
import AdminDashboard  from './pages/admin/AdminDashboard.jsx';
import AdminAnalytics  from './pages/admin/AdminAnalytics.jsx';
import AdminTrains     from './pages/admin/AdminTrains.jsx';
import AdminUsers      from './pages/admin/AdminUsers.jsx';
import AdminBookings   from './pages/admin/AdminBookings.jsx';
import AdminKnowledge  from './pages/admin/AdminKnowledge.jsx';
import AdminAgents     from './pages/admin/AdminAgents.jsx';

export default function App() {
  return (
    <Routes>

      {/* ╔══════════════════════════════════════════════════════════════╗
          ║  USER ROUTES — Layout ke ANDAR → Navbar + Footer dikhega   ║
          ╚══════════════════════════════════════════════════════════════╝ */}
      <Route element={<Layout />}>

        {/* Public */}
        <Route index                    element={<Landing />} />
        <Route path="login"             element={<Login />} />
        <Route path="register"          element={<Register />} />
        <Route path="forgot-password"   element={<ForgotPassword />} />
        <Route path="reset-password"    element={<ResetPassword />} />
        <Route path="trains"            element={<Trains />} />
        <Route path="trainsSearch"      element={<TrainSearch />} />
        <Route path="trainsSearch/:id"  element={<TrainDetails />} />
        <Route path="pnr"               element={<PNRStatus />} />
        <Route path="assistant"         element={<AIAssistant />} />

        {/* Protected user */}
        <Route element={<ProtectedRoute />}>
          <Route path="dashboard"        element={<Dashboard />} />
          <Route path="book/:trainId"    element={<Booking />} />
          <Route path="pay/:bookingId"   element={<Payment />} />
          <Route path="tatkal/:trainId"  element={<TatkalBooking />} />
          <Route path="payment/success"  element={<PaymentSuccess />} />
          <Route path="payment/failure"  element={<PaymentFailure />} />
          <Route path="tickets"          element={<MyTickets />} />
          <Route path="trip-planner"     element={<TripPlanner />} />
          <Route path="profile"          element={<Profile />} />
          <Route path="notifications"    element={<Notifications />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>

      {/* ╔══════════════════════════════════════════════════════════════╗
          ║  ADMIN ROUTES — Layout ke BAHAR → NO Navbar, NO Footer     ║
          ║  AdminLayout apna sidebar + header khud render karega       ║
          ╚══════════════════════════════════════════════════════════════╝ */}
      <Route element={<ProtectedRoute role="admin" />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index               element={<AdminDashboard />} />
          <Route path="analytics"    element={<AdminAnalytics />} />
          <Route path="trains"       element={<AdminTrains />} />
          <Route path="users"        element={<AdminUsers />} />
          <Route path="bookings"     element={<AdminBookings />} />
          <Route path="knowledge"    element={<AdminKnowledge />} />
          <Route path="agents"       element={<AdminAgents />} />
        </Route>
      </Route>

    </Routes>
  );
}