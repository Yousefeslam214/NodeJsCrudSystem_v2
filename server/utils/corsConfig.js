// utils/corsConfig.js
const cors = require('cors');

const allowedOrigins = ['http://localhost:5173']; // Your React app's URL

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        // callback(null, true);

        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
};

module.exports = corsOptions;




// app.use(cors());
// app.use(cors({ origin: '*' }));


// app.use(cors({
//     origin: '*', // Allows all origins. Adjust this as needed for security.
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));




// CORS configuration
// const allowedOrigins = ['https://warehouse-management-system-01.netlify.app'];
// const allowedOrigins = ['http://localhost:5173'];
// app.use(cors({
//     origin: function (origin, callback) {
//         // allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//     credentials: true
// }));





// // CORS configuration
// const allowedOrigins = ['http://localhost:5173']; // Your React app's URL

// app.use(cors({
//     origin: function (origin, callback) {
//         // if (!origin) return callback(null, true);
//         // if (allowedOrigins.indexOf(origin) === -1) {
//         //     const msg = 'The CORS policy for this site does not allow access from the specified origin.';    
//         //     return callback(new Error(msg), false);
//         // }
//         return callback(null, true);
//     },
// }));
