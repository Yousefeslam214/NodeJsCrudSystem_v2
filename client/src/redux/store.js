import { configureStore } from '@reduxjs/toolkit'; // Import getDefaultMiddleware
// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'; // Import getDefaultMiddleware
// import thunk from 'redux-thunk'; // Import thunk correctly
import userReducer from './userSlice'; // Import userReducer correctly
// import thunk from 'redux-thunk';
import loggerMiddleware from './loggerMiddleware'; // Import logger middleware

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk), // Correct middleware setup
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware), // Add logger
    // middleware: [thunk], // Directly include thunk if customization is needed

});

export default store;
