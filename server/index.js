const express = require('express')
const app = express()
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route')
const userRoute = require('./routes/user.route')
const hST = require('./utils/httpStatusText');
const path = require('path')
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const fs = require('fs')

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))



require('dotenv').config()
// middleware
app.use(express.urlencoded({ extended: true }))
const cors = require('cors');


// CORS configuration
// app.use(cors());
// app.use(cors({ origin: '*' }));


// app.use(cors({
//     origin: '*', // Allows all origins. Adjust this as needed for security.
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true
// }));


app.use(express.json());


// CORS configuration
// const allowedOrigins = ['https://warehouse-management-system-01.netlify.app'];
const allowedOrigins = ['http://localhost:5173'];
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


app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});

//     credentials: true

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});





// routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);


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







// GridFS setup
// const connection = mongoose.connection;
// let gfs, gridFSBucket;

// connection.once('open', () => {
//     gfs = new mongoose.mongo.GridFSBucket(connection.db, {
//         bucketName: 'uploads'
//     });
//     gridFSBucket = gfs;
// });

// // Multer setup for GridFS
// const storage = new GridFsStorage({
//     url: process.env.URL,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             const filename = `user~${Date.now()}-${file.originalname}`;
//             const fileInfo = {
//                 filename: filename,
//                 bucketName: 'uploads',
//             };
//             resolve(fileInfo);
//         });
//     }
// });

// const upload = multer({ storage });













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
