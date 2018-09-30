let fs = require('fs');

function isCsvFile(filename, path) {
    return fs.existsSync(path + "/" + filename) 
        && fs.statSync(path + "/" + filename).isFile() 
        && filename.endsWith(".csv");
}

function logChange(type, file, logFile) {
    let change = {
        timestamp: Date.now(),
        type: type,
        filename: file
    };
    let str = JSON.stringify(change);
    fs.appendFileSync(logFile, str + "\r\n");
    console.log(change);
}

function changesLogger(folder, logFile) {
    let filesBefore = fs.readdirSync(folder).length;
    let lock = false; // simple way of handling bug in API
    fs.watch(folder, "utf8", function(type, filename) {
        let curr = fs.readdirSync(folder).length;
        if (isCsvFile(filename, folder)) {
            if (type === "change") {
                if (!lock) {
                    logChange("change", filename, logFile);
                    lock = true;
                }
                setTimeout(() => {
                    lock = false;
                }, 100);
            }
            if (type === "rename") {
                if (filesBefore < curr) {
                    logChange("create", filename, logFile);
                }
            }   
        }
        filesBefore = curr;
    })
}


changesLogger("observable", "results.log");