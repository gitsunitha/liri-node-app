require("dotenv").config();
var fs = require("fs");

function logMessage(messageToLog) {
    let logFileName = process.env.LOG_FILE
    fs.appendFile(logFileName, messageToLog, function(err) {
        // If an error was experienced we will log it.
        if (err) {
            console.log(err);
        }
    });
}

module.exports = {
    logMessage: logMessage
}