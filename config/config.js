require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    TWELVE_DATA_API_KEY: process.env.TWELVE_DATA_API_KEY
};