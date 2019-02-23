const axios = require("axios");
//TODO: document needed
module.exports = async config => {
    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        throw error;
    } finally {
    }
};
