import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Configure axios to send credentials (cookies) with requests
axios.defaults.withCredentials = true;

// Room Posts API
export const fetchRoomPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/roomposts`);
    return response.data;
};

export const fetchRoomPostById = async (id: number) => {
    const response = await axios.get(`${API_BASE_URL}/roomposts/${id}`);
    return response.data;
};

export const createRoomPost = async (roomPostData: any) => {
    const response = await axios.post(`${API_BASE_URL}/roomposts`, roomPostData);
    return response.data;
};

// Room Requests API
export const fetchRoomRequests = async () => {
    const response = await axios.get(`${API_BASE_URL}/roomrequests`);
    return response.data;
};

export const createRoomRequest = async (roomRequestData: any) => {
    const response = await axios.post(`${API_BASE_URL}/roomrequests`, roomRequestData);
    return response.data;
};

// User API
export const fetchCurrentUser = async () => {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
};