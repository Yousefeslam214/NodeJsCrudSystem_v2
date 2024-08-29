// firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./uploadimages-6291d-firebase-adminsdk-r2g9t-cd089b64ed.json'); // Path to your service account key

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: 'uploadimages-6291d.appspot.com'
});

const bucket = admin.storage().bucket();

module.exports = { admin, bucket };
