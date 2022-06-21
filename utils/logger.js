const { createLogger: createWinstonLogger, transports, format } = require('winston');
require('winston-daily-rotate-file');

const { appName, writeLogsToFile } = require('../config');

const loggerConsole = createWinstonLogger({
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
            level: 'info'
        })
    ]
});

let loggerFile;
if (writeLogsToFile) {
    loggerFile = createWinstonLogger({
        transports: [
            new transports.DailyRotateFile({
                filename: `${appName}_%DATE%.log`,
                datePattern: 'DDMMYYYY',
                format: format.simple(),
                level: 'info',
                maxFiles: '3'
            })
        ]
    });
}

const loggerToConsole = new Proxy({}, {
    get: (_, level) => (message) => {
        loggerConsole[level](`${level === 'error' ? 'SwanError: ' : ''}${message}`);
    }
});

const loggerToFile = new Proxy({}, {
    get: (_, level) => (message) => {
        loggerFile[level](`${new Date().toISOString()} ${message}`);
    }
});

const logger = new Proxy({}, {
    get: (_, level) => (() => {
        if (writeLogsToFile) {
            return (message, req) => {
                loggerToConsole[level](message);
                loggerToFile[level](message);
            };
        }
        return loggerToConsole[level];
    })()
});


module.exports = {
    logger,
    loggerToConsole,
    loggerToFile
};
