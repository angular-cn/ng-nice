/*global module,exports,require,console*/
"use strict";
var winston = require("winston");

module.exports = function (loggerConfig) {
    var logger = new (winston.Logger)({}), errorLogger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({ filename: loggerConfig.dirname + '/error.log', level: "warn" })
        ]
    });

    logger.handleExceptions(new winston.transports.File({ filename: loggerConfig.dirname + '/exceptions-error.log' }));
    errorLogger.handleExceptions(new winston.transports.File({ filename: loggerConfig.dirname + '/exceptions-error.log' }));
    if(loggerConfig.filename){
        logger.add(winston.transports.File, {
            level   : loggerConfig.level,
            filename: loggerConfig.filename,
            dirname : loggerConfig.dirname,
            maxsize : loggerConfig.maxsize
        });
    }else{
        logger.add(winston.transports.Console, {level: 'debug'});
        errorLogger.add(winston.transports.Console, {level: 'debug'});
    }
    return {
        log  : function () {
            logger.log.apply(logger, arguments);
        },
        info : function () {
            logger.info.apply(logger, arguments);
        },
        debug: function () {
            logger.debug.apply(logger, arguments);
        },
        warn : function () {
            errorLogger.warn.apply(logger, arguments);
        },
        error: function () {
            errorLogger.error.apply(logger, arguments);
        }
    };
};