export const loadRazorpay = () => new Promise((resolve) => {
  if (document.getElementById('rzp-script')) return resolve(true);
  const s = document.createElement('script');
  s.id = 'rzp-script'; s.src = 'https://checkout.razorpay.com/v1/checkout.js';
  s.onload = () => resolve(true); s.onerror = () => resolve(false);
  document.body.appendChild(s);
});
