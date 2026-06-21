// // import axios from 'axios';

// // const api = axios.create({
// //   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
// //   withCredentials: true,
// // });

// // api.interceptors.request.use((config) => {
// //   const token = localStorage.getItem('access');
// //   if (token) config.headers.Authorization = `Bearer ${token}`;
// //   return config;
// // });

// // let refreshing = null;
// // api.interceptors.response.use(
// //   (r) => r,
// //   async (error) => {
// //     const original = error.config;
// //     if (error?.response?.status === 401 && !original._retry && localStorage.getItem('refresh')) {
// //       original._retry = true;
// //       try {
// //         refreshing = refreshing || axios.post(
// //           (import.meta.env.VITE_API_URL || 'http://localhost:5000/api') + '/auth/refresh',
// //           { refreshToken: localStorage.getItem('refresh') }
// //         );
// //         const res = await refreshing;
// //         refreshing = null;
// //         const { access, refresh } = res.data.data;
// //         localStorage.setItem('access', access);
// //         localStorage.setItem('refresh', refresh);
// //         original.headers.Authorization = `Bearer ${access}`;
// //         return api(original);
// //       } catch (e) {
// //         refreshing = null;
// //         localStorage.removeItem('access'); localStorage.removeItem('refresh');
// //       }
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export default api;









// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   timeout: 15000,
// });

// // Request Interceptor
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('access');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve(token);
//   });
//   failedQueue = [];
// };

// // Response Interceptor
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then((token) => {
//           originalRequest.headers.Authorization = `Bearer ${token}`;
//           return api(originalRequest);
//         }).catch(err => Promise.reject(err));
//       }

//       isRefreshing = true;

//       try {
//         const refreshToken = localStorage.getItem('refresh');
//         if (!refreshToken) throw new Error("No refresh token");

//         const res = await axios.post(
//           `${api.defaults.baseURL}/auth/refresh`,
//           { refreshToken }
//         );

//         const { access, refresh } = res.data?.data || res.data;

//         if (!access) throw new Error("Invalid refresh response");

//         localStorage.setItem('access', access);
//         if (refresh) localStorage.setItem('refresh', refresh);

//         // Update header
//         originalRequest.headers.Authorization = `Bearer ${access}`;

//         processQueue(null, access);
//         return api(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         localStorage.removeItem('access');
//         localStorage.removeItem('refresh');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default api;




import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 150000,
});

// 🔥 Strong Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.warn("⚠️ No access token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh');
        if (!refreshToken) throw new Error("No refresh token");

        const res = await axios.post(`${api.defaults.baseURL}/auth/refresh`, {
          refreshToken
        });

        const { access, refresh } = res.data?.data || res.data;

        localStorage.setItem('access', access);
        if (refresh) localStorage.setItem('refresh', refresh);

        originalRequest.headers.Authorization = `Bearer ${access}`;

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;