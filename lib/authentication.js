'use strict';

const _ = require('lodash');
const request = require('request');

module.exports = function(options) {
    const resource = 'authenticate';

    return {

        authenticate(auth, fn) {
            const request_options = _.defaults({
                url: `/${resource}/`,
                method: 'POST',
                json: {
                    user: `/Compute-${options.identity_domain}/${auth.username}`,
                    password: auth.password
                }
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 204) {
                    return fn(new Error(body.message));
                } else{
                    options.headers.Cookie = response.headers['set-cookie'][0];
                    return fn();
                }
            });
        }
    };
};
