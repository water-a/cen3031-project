const basicAuth = require('express-basic-auth');
exports.check = basicAuth({
    users: {
        'admin': 'pass12'
    },
    challenge: true,
    unauthorizedResponse: () => {
        return '<head><link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></head><body style="background-color:#ffe9e8;display:flex;justify-content:center;align-items:center;flex-direction:column;color:#394B59;font-family:\'Roboto\',sans-serif;"><h1 style="color:#182026">Unauthorized</h1>Please refresh the page and enter the correct credential details!</body>';
    }
});