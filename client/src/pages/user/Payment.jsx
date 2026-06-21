// // // // import { useEffect, useState } from 'react';
// // // // import { useNavigate, useParams } from 'react-router-dom';
// // // // import toast from 'react-hot-toast';
// // // // import { bookingApi, paymentApi } from '../../api/endpoints';
// // // // import { loadRazorpay } from '../../utils/razorpay';
// // // // import { useAuth } from '../../context/AuthContext.jsx';

// // // // export default function Payment() {
// // // //   const { bookingId } = useParams();
// // // //   const [b, setB] = useState(null);
// // // //   const { user } = useAuth();
// // // //   const nav = useNavigate();

// // // //   useEffect(() => { bookingApi.byId(bookingId).then((r) => setB(r.data.data)); }, [bookingId]);

// // // //   const pay = async () => {
// // // //     const ok = await loadRazorpay();
// // // //     if (!ok) return toast.error('Failed to load checkout');
// // // //     const orderRes = await paymentApi.order(bookingId);
// // // //     const { orderId, amount, currency, keyId } = orderRes.data.data;
// // // //     const rzp = new window.Razorpay({
// // // //       key: keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
// // // //       amount, currency, order_id: orderId,
// // // //       name: 'RailwayGPT AI', description: `PNR ${b.pnr}`,
// // // //       prefill: { name: user.name, email: user.email, contact: user.phone || '' },
// // // //       theme: { color: '#2563eb' },
// // // //       handler: async (resp) => {
// // // //         try {
// // // //           await paymentApi.verify({ ...resp, bookingId });
// // // //           nav('/payment/success?pnr=' + b.pnr);
// // // //         } catch { nav('/payment/failure'); }
// // // //       },
// // // //       modal: { ondismiss: () => nav('/payment/failure') },
// // // //     });
// // // //     rzp.open();
// // // //   };

// // // //   if (!b) return <div className="p-10">Loading…</div>;
// // // //   return (
// // // //     <div className="max-w-xl mx-auto px-4 py-10">
// // // //       <h1 className="text-2xl font-bold">Confirm & Pay</h1>
// // // //       <div className="card mt-6 space-y-2">
// // // //         <div>Train: <b>{b.trainName} #{b.trainNumber}</b></div>
// // // //         <div>{b.fromStation} → {b.toStation}</div>
// // // //         <div>Date: {new Date(b.journeyDate).toDateString()}</div>
// // // //         <div>Class: {b.class} · Passengers: {b.passengers.length}</div>
// // // //         <div className="text-2xl font-bold mt-2">₹{b.totalAmount}</div>
// // // //       </div>
// // // //       <button onClick={pay} className="btn-primary w-full mt-4">Pay with Razorpay</button>
// // // //     </div>
// // // //   );
// // // // }





// // // import { useEffect, useState } from 'react';
// // // import { useNavigate, useParams } from 'react-router-dom';
// // // import toast from 'react-hot-toast';
// // // import { bookingApi, paymentApi } from '../../api/endpoints';
// // // import { loadRazorpay } from '../../utils/razorpay';
// // // import { useAuth } from '../../context/AuthContext.jsx';

// // // export default function Payment() {
// // //   const { bookingId } = useParams();
// // //   const [booking, setBooking] = useState(null);
// // //   const [loading, setLoading] = useState(false);
// // //   const { user } = useAuth();
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     const fetchBooking = async () => {
// // //       try {
// // //         const res = await bookingApi.byId(bookingId);
// // //         setBooking(res.data?.data || res.data);
// // //       } catch (err) {
// // //         toast.error("Failed to load booking details");
// // //         navigate('/tickets');
// // //       }
// // //     };
// // //     fetchBooking();
// // //   }, [bookingId, navigate]);

// // //   const handlePayment = async () => {
// // //     if (!booking) return;

// // //     setLoading(true);
// // //     try {
// // //       const razorpayLoaded = await loadRazorpay();
// // //       if (!razorpayLoaded) throw new Error('Failed to load Razorpay');

// // //       const orderRes = await paymentApi.order(bookingId);
// // //       const { orderId, amount, currency, keyId } = orderRes.data.data || orderRes.data;

// // //       const options = {
// // //         key: keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
// // //         amount,
// // //         currency: currency || 'INR',
// // //         order_id: orderId,
// // //         name: 'RailwayGPT AI',
// // //         description: `PNR ${booking.pnr}`,
// // //         prefill: {
// // //           name: user?.name || '',
// // //           email: user?.email || '',
// // //           contact: user?.phone || '',
// // //         },
// // //         theme: { color: '#7c3aed' },
// // //         handler: async (response) => {
// // //           try {
// // //             await paymentApi.verify({ ...response, bookingId });
// // //             toast.success('Payment Successful!');
// // //             navigate(`/payment/success?pnr=${booking.pnr}`);
// // //           } catch (err) {
// // //             toast.error('Payment verification failed');
// // //             navigate('/payment/failure');
// // //           }
// // //         },
// // //         modal: {
// // //           ondismiss: () => {
// // //             toast.error('Payment cancelled');
// // //             navigate('/payment/failure');
// // //           },
// // //         },
// // //       };

// // //       const rzp = new window.Razorpay(options);
// // //       rzp.open();
// // //     } catch (error) {
// // //       console.error(error);
// // //       toast.error(error.response?.data?.message || 'Payment initiation failed');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   if (!booking) return <div className="p-10 text-center text-xl">Loading booking details...</div>;

// // //   return (
// // //     <div className="max-w-xl mx-auto px-4 py-12">
// // //       <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
// // //       <p className="text-slate-400 mb-8">PNR: {booking.pnr}</p>

// // //       <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 space-y-6">
// // //         <div className="space-y-3">
// // //           <div><strong>Train:</strong> {booking.trainName} #{booking.trainNumber}</div>
// // //           <div><strong>Route:</strong> {booking.fromStation} → {booking.toStation}</div>
// // //           <div><strong>Date:</strong> {new Date(booking.journeyDate).toDateString()}</div>
// // //           <div><strong>Class:</strong> {booking.class} • {booking.passengers.length} Passengers</div>
// // //         </div>

// // //         <div className="border-t border-gray-700 pt-6">
// // //           <div className="flex justify-between text-3xl font-bold">
// // //             <span>Total</span>
// // //             <span>₹{booking.totalAmount}</span>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       <button
// // //         onClick={handlePayment}
// // //         disabled={loading}
// // //         className="w-full mt-8 bg-violet-600 hover:bg-violet-700 py-4 rounded-2xl text-lg font-semibold disabled:opacity-70 transition"
// // //       >
// // //         {loading ? 'Processing...' : 'Pay Now with Razorpay'}
// // //       </button>
// // //     </div>
// // //   );
// // // }




// // import { useEffect, useState } from 'react';
// // import { useNavigate, useParams } from 'react-router-dom';
// // import toast from 'react-hot-toast';
// // import { bookingApi, paymentApi } from '../../api/endpoints';
// // import { loadRazorpay } from '../../utils/razorpay';
// // import { useAuth } from '../../context/AuthContext.jsx';

// // export default function Payment() {
// //   const { bookingId } = useParams();
// //   const [booking, setBooking] = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const { user } = useAuth();
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const fetchBooking = async () => {
// //       try {
// //         const res = await bookingApi.byId(bookingId);
// //         const bookingData = res.data?.data || res.data;
// //         setBooking(bookingData);
// //       } catch (err) {
// //         console.error(err);
// //         toast.error("Failed to load booking details");
// //         navigate('/tickets');
// //       }
// //     };
// //     fetchBooking();
// //   }, [bookingId, navigate]);

// //   const handlePayment = async () => {
// //     console.log("🔑 Current Access Token:", localStorage.getItem('access') ? "✅ Present" : "❌ Missing");
  
// //   if (!booking) return toast.error("Booking details not found");
// //     // if (!booking) return toast.error("Booking details not found");

// //     setLoading(true);
// //     try {
// //       const razorpayLoaded = await loadRazorpay();
// //       if (!razorpayLoaded) throw new Error('Failed to load Razorpay SDK');

// //       // Create Order
// //       const orderRes = await paymentApi.order(bookingId);
// //       const { orderId, amount, currency, keyId } = orderRes.data?.data || orderRes.data;

// //       if (!orderId) throw new Error("Failed to create payment order");

// //       const options = {
// //         key: keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
// //         amount: amount,
// //         currency: currency || 'INR',
// //         order_id: orderId,
// //         name: 'RailwayGPT AI',
// //         description: `PNR ${booking.pnr}`,
// //         prefill: {
// //           name: user?.name || '',
// //           email: user?.email || '',
// //           contact: user?.phone || '',
// //         },
// //         theme: { color: '#7c3aed' },
// //         handler: async (response) => {
// //           try {
// //             await paymentApi.verify({ ...response, bookingId });
// //             toast.success('Payment Successful! 🎉');
// //             navigate(`/payment/success?pnr=${booking.pnr}`);
// //           } catch (err) {
// //             console.error(err);
// //             toast.error('Payment verification failed');
// //             navigate('/payment/failure');
// //           }
// //         },
// //         modal: {
// //           ondismiss: () => {
// //             toast.error('Payment window closed');
// //             navigate('/payment/failure');
// //           },
// //         },
// //       };

// //       const rzp = new window.Razorpay(options);
// //       rzp.open();
// //     } catch (error) {
// //       console.error("Payment Error:", error);
// //       toast.error(error.response?.data?.message || error.message || 'Payment initiation failed');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   if (!booking) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
// //           <p className="mt-4 text-slate-400">Loading booking details...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="max-w-xl mx-auto px-4 py-12">
// //       <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
// //       <p className="text-slate-400 mb-8">PNR: <span className="font-mono">{booking.pnr}</span></p>

// //       <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 space-y-6">
// //         <div className="space-y-4 text-lg">
// //           <div><strong>Train:</strong> {booking.trainName} #{booking.trainNumber}</div>
// //           <div><strong>Route:</strong> {booking.fromStation} → {booking.toStation}</div>
// //           <div><strong>Journey Date:</strong> {new Date(booking.journeyDate).toDateString()}</div>
// //           <div><strong>Class:</strong> {booking.class} • {booking.passengers?.length || 0} Passengers</div>
// //         </div>

// //         <div className="border-t border-gray-700 pt-6">
// //           <div className="flex justify-between items-center text-3xl font-bold">
// //             <span>Total Payable</span>
// //             <span>₹{booking.totalAmount}</span>
// //           </div>
// //         </div>
// //       </div>

// //       <button
// //         onClick={handlePayment}
// //         disabled={loading}
// //         className="w-full mt-10 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 py-4 rounded-2xl text-lg font-semibold transition-all active:scale-95"
// //       >
// //         {loading ? 'Processing Payment...' : 'Pay Now with Razorpay'}
// //       </button>
// //     </div>
// //   );
// // }






// import { useEffect, useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import { bookingApi, paymentApi } from '../../api/endpoints';
// import { loadRazorpay } from '../../utils/razorpay';
// import { useAuth } from '../../context/AuthContext.jsx';

// export default function Payment() {
//   const { bookingId } = useParams();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const res = await bookingApi.byId(bookingId);
//         const bookingData = res.data?.data || res.data;
//         setBooking(bookingData);
//       } catch (err) {
//         console.error("Failed to fetch booking:", err);
//         toast.error("Failed to load booking details");
//         navigate('/tickets');
//       }
//     };
//     fetchBooking();
//   }, [bookingId, navigate]);

//   const handlePayment = async () => {
//     if (!booking) return toast.error("Booking details not found");

//     setLoading(true);
//     try {
//       console.log("🔑 Starting payment for booking:", bookingId);

//       const razorpayLoaded = await loadRazorpay();
//       if (!razorpayLoaded) throw new Error('Failed to load Razorpay SDK');

//       // Create Order
//       const orderRes = await paymentApi.order(bookingId);
//       console.log("✅ Order created successfully:", orderRes.data);

//       const { orderId, amount, currency, keyId } = orderRes.data?.data || orderRes.data;

//       if (!orderId) throw new Error("Invalid order response from server");

//       const options = {
//         key: keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: amount,
//         currency: currency || 'INR',
//         order_id: orderId,
//         name: 'RailwayGPT AI',
//         description: `PNR ${booking.pnr}`,
//         prefill: {
//           name: user?.name || '',
//           email: user?.email || '',
//           contact: user?.phone || '',
//         },
//         theme: { color: '#7c3aed' },
//         handler: async (response) => {
//           try {
//             await paymentApi.verify({ ...response, bookingId });
//             toast.success('Payment Successful! 🎉');
//             navigate(`/payment/success?pnr=${booking.pnr}`);
//           } catch (err) {
//             console.error("Verification failed:", err);
//             toast.error('Payment verification failed');
//             navigate('/payment/failure');
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             toast.error('Payment cancelled by user');
//             navigate('/payment/failure');
//           },
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("❌ Payment Error Details:", {
//         message: error.message,
//         response: error.response?.data,
//         status: error.response?.status,
//       });

//       const errorMsg = error.response?.data?.message || error.message || 'Payment initiation failed';
//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!booking) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-950">
//         <div className="text-center">
//           <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
//           <p className="mt-4 text-slate-400">Loading booking details...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-xl mx-auto px-4 py-12">
//       <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
//       <p className="text-slate-400 mb-8">PNR: <span className="font-mono font-medium">{booking.pnr}</span></p>

//       <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 space-y-6">
//         <div className="space-y-4 text-lg">
//           <div><strong>Train:</strong> {booking.trainName} #{booking.trainNumber}</div>
//           <div><strong>Route:</strong> {booking.fromStation} → {booking.toStation}</div>
//           <div><strong>Journey Date:</strong> {new Date(booking.journeyDate).toDateString()}</div>
//           <div><strong>Class:</strong> {booking.class} • {booking.passengers?.length || 0} Passengers</div>
//         </div>

//         <div className="border-t border-gray-700 pt-6">
//           <div className="flex justify-between items-center text-3xl font-bold">
//             <span>Total Payable</span>
//             <span>₹{booking.totalAmount}</span>
//           </div>
//         </div>
//       </div>

//       <button
//         onClick={handlePayment}
//         disabled={loading}
//         className="w-full mt-10 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 py-4 rounded-2xl text-lg font-semibold transition-all active:scale-95"
//       >
//         {loading ? 'Processing Payment...' : 'Pay Now with Razorpay'}
//       </button>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { bookingApi, paymentApi } from '../../api/endpoints';
import { loadRazorpay } from '../../utils/razorpay';
import { useAuth } from '../../context/AuthContext.jsx';

export default function Payment() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await bookingApi.byId(bookingId);
        setBooking(res.data?.data || res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load booking details");
        navigate('/tickets');
      }
    };
    fetchBooking();
  }, [bookingId, navigate]);

  const handlePayment = async () => {
    if (!booking) return toast.error("Booking details not found");

    setLoading(true);
    try {
      const orderRes = await paymentApi.order(bookingId);
      console.log("✅ Full Order Response:", orderRes.data);

      // Correct destructuring according to your controller
      const responseData = orderRes.data?.data || orderRes.data;
      const { order, payment, keyId } = responseData;

      if (!order?.id) {
        throw new Error("Invalid order received from server");
      }

      const options = {
        key: keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency || 'INR',
        order_id: order.id,
        name: 'RailwayGPT AI',
        description: `PNR ${booking.pnr}`,
        prefill: {
          name: user?.name || '',
          email: user?.email || '',
          contact: user?.phone || '',
        },
        theme: { color: '#7c3aed' },
        handler: async (response) => {
          try {
            await paymentApi.verify({ ...response, bookingId });
            toast.success('Payment Successful! 🎉');
            navigate(`/payment/success?pnr=${booking.pnr}`);
          } catch (err) {
            toast.error('Payment verification failed');
            navigate('/payment/failure');
          }
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
            navigate('/payment/failure');
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("❌ Payment Error:", error.response?.data || error);
      toast.error(error.response?.data?.message || error.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-slate-400">Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Complete Your Booking</h1>
      <p className="text-slate-400 mb-8">PNR: <span className="font-mono">{booking.pnr}</span></p>

      <div className="bg-gray-900 border border-gray-700 rounded-3xl p-8 space-y-6">
        <div className="space-y-4 text-lg">
          <div><strong>Train:</strong> {booking.trainName} #{booking.trainNumber}</div>
          <div><strong>Route:</strong> {booking.fromStation} → {booking.toStation}</div>
          <div><strong>Date:</strong> {new Date(booking.journeyDate).toDateString()}</div>
          <div><strong>Class:</strong> {booking.class} • {booking.passengers?.length || 0} Passengers</div>
        </div>

        <div className="border-t border-gray-700 pt-6">
          <div className="flex justify-between items-center text-3xl font-bold">
            <span>Total Payable</span>
            <span>₹{booking.totalAmount}</span>
          </div>
        </div>
      </div>

      <button
        onClick={handlePayment}
        disabled={loading}
        className="w-full mt-10 bg-violet-600 hover:bg-violet-700 disabled:bg-gray-600 py-4 rounded-2xl text-lg font-semibold transition-all"
      >
        {loading ? 'Processing Payment...' : 'Pay Now with Razorpay'}
      </button>
    </div>
  );
}