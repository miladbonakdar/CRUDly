const axios = require("axios");

module.exports = async (config)=> {
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error;
    } finally {
    }
};
