const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');

const productRoute = require('./routes/product.route');
const userRoute = require('./routes/user.route');
const asyncWrapper = require('./middleware/asyncWrapper');
const hST = require('./utils/httpStatusText');

// Initialize environment variables
dotenv.config();

// Create an Express application
const app = express();

// Configure file upload middleware
const upload = multer({ dest: 'uploads/' });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
const allowedOrigins = ['http://localhost:5173'];
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS policy does not allow access from the specified origin'), false);
        }
        return callback(null, true);
    },
    credentials: true
}));

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// File upload route
app.post('/upload', upload.single('file'), (req, res) => {
    console.log('File:', req.file);
    console.log('Form Fields:', req.body);
    res.send('File uploaded successfully!');
});

// API routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

// Handle non-existent routes
app.all('*', (req, res) => {
    res.status(404).json({
        status: hST.ERROR,
        data: { message: 'This resource is not available' }
    });
});

// Global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({
        status: error.statusText || hST.ERROR,
        message: error.message,
        code: error.statusCode || 500,
        data: null
    });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.URL)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

const port = process.env.PORT || 5002;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
