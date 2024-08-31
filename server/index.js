const express = require('express')
const app = express()
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route')
// const userRoute = require('./routes/user.route')
const hST = require('./utils/httpStatusText');

require('dotenv').config()
const cors = require('cors');
const asyncWrapper = require('./middleware/asyncWrapper');


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// CORS configuration
// app.use(cors());

// app.use(cors({
//     origin: '*',
//     credentials: true
// }));
// app.use(express.json());

// CORS configuration
// const allowedOrigins = ['http://localhost:5173']; // Your React app's URL
const allowedOrigins = ['https://warehouse-management-system-01.netlify.app'];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true
}));





// CORS configuration
// const allowedOrigins = ['http://localhost:5173']; // Your React app's URL

// app.use(cors({
//     origin: function (origin, callback) {
//         if (!origin) return callback(null, true);
//         if (allowedOrigins.indexOf(origin) === -1) {
//             const msg = 'The CORS policy for this site does not allow access from the specified origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     },
//     credentials: true
// }));







// app.get('/', (req, res) => {
//     res.send('<h1>Hello World</h1>');
// });

// routes
app.use("/api/products", productRoute);
// app.use("/api/users", userRoute);


// handle wrong routers
app.all('*', (req, res, next) => {
    return res.status(404).json({
        status: hST.ERROR,
        data: { message: 'this resource is not available' }
    });
})
// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || hST.ERROR, message: error.message, code: error.statusCode || 500, data: null })
})




mongoose.connect(process.env.URL).then(() => {
    console.log("mongoDB started !")
})
    .catch(() => {
        console.log("mongoDB dosen't started !")
    })


const port = process.env.PORT || 5002
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)

})
