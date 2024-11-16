require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    ALPHA_VANTAGE_API_KEY: process.env.ALPHA_VANTAGE_API_KEY
};