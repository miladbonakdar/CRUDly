const axios = require('axios');

/**
 * @description request function
 * @param axiosConfig axios request config
 */
module.exports = async axiosConfig => {
    try {
        const response = await axios(axiosConfig);
        return response;
    } catch (error) {
        throw error;
    } finally {
    }
};
