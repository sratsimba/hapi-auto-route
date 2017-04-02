'use strict';

const AutoRoute = require('./autoroute');

module.exports.register = function (server, options, next) {

    const autoroute = new AutoRoute(server, options);
    autoroute.loadRoutes();
    return next();
};

module.exports.register.attributes = {
    pkg: require('../package.json')
};
