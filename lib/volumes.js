'use strict';

const _ = require('lodash');
const request = require('request');

module.exports = function(options) {
    const resource = 'storage/volume';

    return {

        create_volume(volume, fn) {
            const request_options = _.defaults({
                url: `/${resource}/`,
                method: 'POST',
                json: volume
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 201) {
                    return fn(new Error(_.isObject(body.message) ? body.message.error : body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        },

        get_volume(name, fn) {
            const request_options = _.defaults({
                url: `/${resource}${name}`,
                method: 'GET'
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 200) {
                    return fn(new Error(body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        }
    };
};
