// POTENTIALLY NOT NEEDED

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

            /*
                {
  payment_type: 'instant',
  payment_date: '23:52:07 Mar 27, 2019 PDT',
  payment_status: 'Completed',
  address_status: 'confirmed',
  payer_status: 'verified',
  first_name: 'John',
  last_name: 'Smith',
  payer_email: 'buyer@paypalsandbox.com',
  payer_id: 'TESTBUYERID01',
  address_name: 'John Smith',
  address_country: 'United States',
  address_country_code: 'US',
  address_zip: '95131',
  address_state: 'CA',
  address_city: 'San Jose',
  address_street: '123 any street',
  business: 'seller@paypalsandbox.com',
  receiver_email: 'seller@paypalsandbox.com',
  receiver_id: 'seller@paypalsandbox.com',
  residence_country: 'US',
  item_name: 'something',
  item_number: 'AK-1234',
  quantity: '1',
  shipping: '3.04',
  tax: '2.02',
  mc_currency: 'USD',
  mc_fee: '0.44',
  mc_gross: '12.34',
  mc_gross_1: '9.34',
  txn_type: 'web_accept',
  txn_id: '504955508',
  notify_version: '2.1',
  custom: 'xyz123',
  invoice: 'abc1234',
  test_ipn: '1',
  verify_sign: 'AHarqY1AahDCLbKPhcqUXcxePgvdAkgCQdrM6vacs.Ony-TT0oyS1JR9' }

            */
        }
    });
}