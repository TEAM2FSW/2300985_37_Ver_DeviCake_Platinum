require('dotenv').config();
const { Storage } = require('@google-cloud/storage');

// Construct credentials object
const credentials = {
    type: process.env.SERVICE_ACCOUNT_TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'), // Ensuring new lines are properly formatted
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.CLIENT_X509_CERT_URL
};

// Initialize the Storage client with credentials
const storage = new Storage({
    projectId: credentials.project_id,
    credentials: credentials
});

const bucket = storage.bucket('storageimagesprojek.appspot.com');

module.exports = { storage, bucket };