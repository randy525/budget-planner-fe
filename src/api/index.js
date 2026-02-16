import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401
        ) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const register = async (email, name, password) => {
    const response = await api.post('/auth/sign-up', { email, name, password });
    return response.data;
};

export const getTransactions = async () => {
    const response = await api.get('/api/transaction/list');
    return response.data;
};

export const getUserInfo = async () => {
    const response = await api.get('/api/info/user');
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get('/api/info/categories');
    return response.data;
};

export const addTransaction = async (categoryId, value) => {
    const response = await api.post('/api/transaction/add', {
        categoryId: categoryId,
        value: value
    });
    return response.data;
};

export const deleteTransaction = async (transactionId) => {
    const response = await api.delete('/api/transaction/' + transactionId);
    return response.data;
};

export const getGoals = async () => {
    const response = await api.get('/api/goal/list');
    return response.data;
};

export const addGoal = async (name, icon, goalAmount) => {
    const response = await api.post('/api/goal/add', {
        name: name,
        icon: icon,
        goalAmount: goalAmount
    });
    return response.data;
};

export const updateCurrentGoalAmount = async (goalId, newAmount) => {
    const response = await api.post('/api/goal/' + goalId, {
        goalAmount: newAmount,
    });
    return response.data;
};

export const deleteGoalById = async (goalId) => {
    const response = await api.delete('/api/goal/' + goalId);
    return response.data;
};