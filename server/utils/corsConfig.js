// utils/corsConfig.js
const cors = require('cors');

// Add your allowed origins here
const allowedOrigins = [
    'http://localhost:5173', // Your local React app's URL
    'https://warehouse-management-system-01.netlify.app' // Your deployed React app URL
];

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Check if the origin is in the allowed origins array
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }

        // Allow the request
        return callback(null, true);
    },
    credentials: true // Allow credentials to be included in the request
};

module.exports = corsOptions;
