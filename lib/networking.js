'use strict';

const _ = require('lodash');
const request = require('request');

module.exports = function(options) {
    const secip_resource = 'seciplist';
    const secapp_resource = 'secapplication';
    const seclist_resource = 'seclist';
    const secrule_resource = 'secrule';

    return {

        get_security_ip_list(config, autocreate, fn) {
            if(_.isFunction(autocreate)) {
                fn = autocreate;
                autocreate = false;
            }

            const request_options = _.defaults({
                url: `/${secip_resource}${config.name}`,
                method: 'GET'
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode == 404 && autocreate) {
                    this.create_security_ip_list(config, (err, security_ip_list) => {
                        return fn(err, security_ip_list);
                    });
                } else if(response.statusCode != 200) {
                    return fn(new Error(body.message));
                } else{
                    return fn(undefined, body);
                }
            });
        },

        create_security_ip_list(security_ip_list, fn) {
            const request_options = _.defaults({
                url: `/${secip_resource}/`,
                method: 'POST',
                json: security_ip_list
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                }else if(response.statusCode != 201) {
                    return fn(new Error(body.message));
                }else{
                    return fn(undefined, body);
                }
            });
        },

        get_security_application(config, autocreate, fn) {
            if(_.isFunction(autocreate)) {
                fn = autocreate;
                autocreate = false;
            }

            const request_options = _.defaults({
                url: `/${secapp_resource}${config.name}`,
                method: 'GET'
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode == 404 && autocreate) {
                    this.create_security_application(config, (err, security_ip_list) => {
                        return fn(err, security_ip_list);
                    });
                } else if(response.statusCode != 200) {
                    return fn(new Error(body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        },

        create_security_application(security_application, fn) {
            const request_options = _.defaults({
                url: `/${secapp_resource}/`,
                method: 'POST',
                json: security_application
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 201) {
                    return fn(new Error(body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        },

        get_security_list(config, autocreate, fn) {
            if(_.isFunction(autocreate)) {
                fn = autocreate;
                autocreate = false;
            }

            const request_options = _.defaults({
                url: `/${seclist_resource}${config.name}`,
                method: 'GET'
            }, _.clone(options));

            request(request_options, (err, response, body) => {

                if(err) {
                    return fn(err);
                } else if(response.statusCode == 404 && autocreate) {
                    this.create_security_list(config, (err, security_ip_list) => {
                        return fn(err, security_ip_list);
                    });
                } else if(response.statusCode != 200) {
                    return fn(new Error(body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        },

        create_security_list(security_list, fn) {
            const request_options = _.defaults({
                url: `/${seclist_resource}/`,
                method: 'POST',
                json: security_list
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 201) {
                    return fn(new Error(body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        },

        delete_security_list(security_list, fn) {
            const request_options = _.defaults({
                url: `/${secrule_resource}${security_list}`,
                method: 'DELETE'
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 204) {
                    return fn(new Error(body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        },

        get_security_rule(config, autocreate, fn) {
            if(_.isFunction(autocreate)) {
                fn = autocreate;
                autocreate = false;
            }

            const request_options = _.defaults({
                url: `/${secrule_resource}${config.name}`,
                method: 'GET'
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode == 404 && autocreate) {
                    this.create_security_rule(config, (err, security_ip_list) => {
                        return fn(err, security_ip_list);
                    });
                } else if(response.statusCode != 200) {
                    return fn(new Error(body.message));
                } else{
                    return fn(undefined, body);
                }
            });
        },

        create_security_rule(security_rule, fn) {
            const request_options = _.defaults({
                url: `/${secrule_resource}/`,
                method: 'POST',
                json: security_rule
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 201) {
                    return fn(new Error(body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        },

        delete_security_rule(security_rule, fn) {
            const request_options = _.defaults({
                url: `/${secrule_resource}${security_rule}`,
                method: 'DELETE'
            }, _.clone(options));

            request(request_options, (err, response, body) => {
                if(err) {
                    return fn(err);
                } else if(response.statusCode != 204) {
                    return fn(new Error(body.message));
                } else {
                    return fn(undefined, body);
                }
            });
        }
    };
};
