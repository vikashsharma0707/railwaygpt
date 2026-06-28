import { useEffect, useState } from 'react';
import { adminApi, bookingApi, paymentApi, trainApi, authApi } from '../api/endpoints';

export function useDashboardData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await adminApi.dashboard();
        setData(res.data?.data || res.data);
        setError(null);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useAnalyticsData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await adminApi.analytics();
        setData(res.data?.data || res.data);
        setError(null);
      } catch (err) {
        console.error('Analytics fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}

export function useRecentBookings(limit = 8) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await bookingApi.listAll();
        const allBookings = res.data?.data || res.data || [];
        setBookings(allBookings.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Bookings fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [limit]);

  return { bookings, loading, error };
}

export function useRecentPayments(limit = 8) {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        setLoading(true);
        const res = await paymentApi.list();
        const allPayments = res.data?.data || res.data || [];
        setPayments(allPayments.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Payments fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [limit]);

  return { payments, loading, error };
}

export function useAllUsers(limit = 8) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await adminApi.users();
        const allUsers = res.data?.data || res.data || [];
        setUsers(allUsers.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Users fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [limit]);

  return { users, loading, error };
}

export function useAuditLogs(limit = 10) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true);
        const res = await adminApi.audit();
        const allLogs = res.data?.data || res.data || [];
        setLogs(allLogs.slice(0, limit));
        setError(null);
      } catch (err) {
        console.error('Audit logs fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [limit]);

  return { logs, loading, error };
}

export function usePopularRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        setLoading(true);
        const res = await trainApi.popularRoutes();
        setRoutes(res.data?.data || res.data || []);
        setError(null);
      } catch (err) {
        console.error('Popular routes fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, []);

  return { routes, loading, error };
}

export function useAllTrains() {
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        setLoading(true);
        const res = await trainApi.list();
        setTrains(res.data?.data || res.data || []);
        setError(null);
      } catch (err) {
        console.error('Trains fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrains();
  }, []);

  return { trains, loading, error };
}