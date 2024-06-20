import pino from "pino";

const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',          //set time format in the logger message
            ignore: "pid,hostname",                         //ignore pid and hostname in the logger message
        },
    },
});

export default logger;