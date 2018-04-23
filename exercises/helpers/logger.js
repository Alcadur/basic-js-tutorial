function logger (message) { console.log(message); }
logger.ok = () => console.log('\x1b[32m%s\x1b[0m', `${logger.getTitle()} OK`);
logger.error = (message) => console.log("\x1b[31m%s\x1b[0m", `${logger.getTitle()}Error: ${message}`);
logger.getTitle = () => logger.title ? `${logger.title}: ` : '';

module.exports = logger;