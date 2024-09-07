import axios from 'axios';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from './userSlice';

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchUser = (userId, authToken) => async (dispatch) => {
    dispatch(fetchUserStart());
    try {
        const response = await axios.get(`${apiUrl}/api/users/${userId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });
        dispatch(fetchUserSuccess(response.data.data.user));
    } catch (error) {
        dispatch(fetchUserFailure('Failed to fetch user data.'));
    }
};
