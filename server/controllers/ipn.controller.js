const requests = require('request');

const PAYPAL_SANDBOX_API_URL = 'https://ipnpb.sandbox.paypal.com/cgi-bin/webscr';
const PAYPAL_PRODUCTION_API_URL = 'https://ipnpb.paypal.com/cgi-bin/webscr';

exports.validate = async (request, response) => {
    response.status(200).end();
    
    let postBody = 'cmd=_notify-validate';
    Object.keys(request.body).map(key => {
        postBody = postBody + `&${key}=${request.body[key]}`;
        return key;
    });
    
    requests({
        url: request.settings.paypal.sandbox ? PAYPAL_SANDBOX_API_URL : PAYPAL_PRODUCTION_API_URL,
        method: 'POST',
        body: postBody
    }, (error, response, body) => {
        if (!error && 
            response.statusCode === 200 && 
            body.substring(0, 8) === 'VERIFIED'
        ){
            console.log(request.body);
        }
    });
}