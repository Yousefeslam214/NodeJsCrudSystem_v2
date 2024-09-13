// import { createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

// const initialState = {
//     user: null,
//     loading: false,
//     error: null,
// };

// const userSlice = createSlice({
//     name: 'user',
//     initialState,
//     reducers: {
//         fetchUserStart: (state) => {
//             state.loading = true;
//             state.error = null;
//         },
//         fetchUserSuccess: (state, action) => {
//             state.user = action.payload;
//             state.loading = false;
//         },
//         fetchUserFailure: (state, action) => {
//             state.error = action.payload;
//             state.loading = false;
//         },
//         setUser: (state, action) => action.payload,
//         clearUser: () => null,
//         // Add more actions if needed
//     },
// });

// export const { fetchUserStart, fetchUserSuccess, fetchUserFailure, setUser, clearUser } = userSlice.actions;
// // Thunk action for fetching user data
// export const fetchUser = (userId) => async (dispatch) => {
//     dispatch(fetchUserStart());
//     try {
//         const cookieToken = getCookie('authToken'); // Assume getCookie is a function that retrieves cookies
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
//             headers: {
//                 'Authorization': `Bearer ${cookieToken}`
//             }
//         });
//         dispatch(fetchUserSuccess(response.data.data.user));
//     } catch (error) {
//         dispatch(fetchUserFailure('Failed to fetch user data.'));
//     }
// };
// export default userSlice.reducer;



// // // slices/userSlice.js
// // import { createSlice } from '@reduxjs/toolkit';

// // const userSlice = createSlice({
// //     name: 'user',
// //     initialState: null,
// //     reducers: {
// //         setUser: (state, action) => action.payload,
// //         clearUser: () => null,
// //     },
// // });

// // export const { setUser, clearUser } = userSlice.actions;

// // export default userSlice.reducer;


// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async ({ userId, cookieToken }, { rejectWithValue }) => {
        try {
            console.log("response")
            // const cookieToken = getCookie('authToken'); // Assuming getCookie is defined elsewhere

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${cookieToken}`,
                },
            }
            );
            console.log("response")
            // console.log(response.data.data.user)

            return response.data.data.user;
        } catch (error) {
            // Use rejectWithValue to pass a custom error message
            return rejectWithValue('Failed to fetch user data.');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
        //  setUser: (state, action) => action.payload,
        // clearUser: () => null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});
// export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
