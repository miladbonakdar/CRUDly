const check = require('../checkFunctions').check;
const axiosDefaultFunctions = require('../../src/utils/axiosDefaultFunctions');

test(
    'check for axiosDefaultFunctions keys',
    check(() => {
        expect(axiosDefaultFunctions.put).toBeDefined();
        expect(axiosDefaultFunctions.post).toBeDefined();
        expect(axiosDefaultFunctions.get).toBeDefined();
        expect(axiosDefaultFunctions.delete).toBeDefined();
        expect(axiosDefaultFunctions.head).toBeDefined();
        expect(axiosDefaultFunctions.patch).toBeDefined();
        expect(axiosDefaultFunctions.all).toBeDefined();
        expect(Object.keys(axiosDefaultFunctions).length).toBe(7);
    })
);