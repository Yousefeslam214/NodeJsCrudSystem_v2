const admin = require('firebase-admin');
const { bucket } = require('../firebase.js'); // Import from firebase.js

/**
 * Upload a file to Firebase Storage.
 * @param {Object} file - The file object from the request.
 * @param {string} destination - The destination path in Firebase Storage.
 * @returns {Promise<string>} - A promise that resolves to the file URL.
 */
async function uploadFile(file, destination) {
    const blob = bucket.file(destination);
    const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
            contentType: file.mimetype
        }
    });

    return new Promise((resolve, reject) => {
        blobStream.on('finish', async () => {
            try {
                // Retrieve metadata to construct the file URL with the token
                const [metadata] = await blob.getMetadata();
                const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(destination)}?alt=media&token=${metadata.firebaseStorageDownloadTokens}`;
                resolve(fileUrl);
            } catch (error) {
                reject(error);
            }
        });

        blobStream.on('error', (err) => {
            reject(err);
        });

        blobStream.end(file.buffer);
    });
}

module.exports = uploadFile;
