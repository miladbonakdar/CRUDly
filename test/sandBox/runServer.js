const serverBuilder = require('../integration/serverBuilder');

serverBuilder('/', 9595, () => {
    console.log('test server is up and runnig');
});