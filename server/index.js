const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const hST = require('./utils/httpStatusText');
const corsOptions = require('./utils/corsConfig'); // Import CORS options





const cookieParser = require('cookie-parser');

// Use the cookie-parser middleware





dotenv.config();

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors(corsOptions)); // Apply CORS configuration
app.use(cookieParser());




// routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});


// Handle unknown routes
app.all('*', (req, res, next) => {
    return res.status(404).json({
        status: hST.ERROR,
        data: { message: 'This resource is not available | You are on the wrong route' },
    });
})

// Global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || hST.ERROR, message: error.message, code: error.statusCode || 500, data: null })
})


mongoose.connect(process.env.URL).then(() => {
    console.log("mongoDB started !")
})
    .catch(() => {
        console.log("mongoDB dosen't started !")
    })


const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
