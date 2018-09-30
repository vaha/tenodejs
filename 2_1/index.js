const fs = require("fs");
const XLSX = require('xlsx');

function paddedArray(gaps) {
    let row = Array.apply(null, [gaps]);
    row.push.apply(row, [...arguments].splice(1));
    return row;
}

function processFolder(wsData, path, level) {
    let folders = fs.readdirSync(path).filter(d => fs.statSync(path + "/" + d).isDirectory());
    folders.forEach(d => {
        wsData.push(paddedArray(level, d));
        processFolder(wsData, path + "/" + d, level + 1);
    });
    let files = fs.readdirSync(path).filter(f => f.endsWith(".json"));
    files.forEach(f => {
        wsData.push(paddedArray(level, f));
        let contents = fs.readFileSync(path + "/" + f, "utf8");
        let json = JSON.parse(contents);
        printObject(wsData, json, level + 1);
    });
}

function printObject(ws, obj, level) {
    for (const prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            const value = obj[prop];
            if (typeof value === "object") {
                ws.push(paddedArray(level, prop));
                if (Array.isArray(value)) {
                    printArray(ws, value, level);
                } else {
                    printObject(ws, value, level + 1);
                }
            } else {
                ws.push(paddedArray(level, prop, value));
            }
        }
    }
}

function printArray(ws, arr, level) {
    arr.forEach(element => {
        if (typeof element === "object") {
            if (Array.isArray(element)) {
                printArray(ws, element, level);
            } else {
                printObject(ws, element, level + 1);
            }
        } else {
            let row = Array.apply(null, [level]);
            row.push(element);
            ws.push(row);
        }
    });
}

function xlsxConverter(sourceFolder, destFolder) {
    let wb = XLSX.utils.book_new();
    var wsData = [];
    processFolder(wsData, sourceFolder, 0);
    let ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "tree");
    XLSX.writeFile(wb, destFolder + "/converted.xlsx");
}

xlsxConverter("input", "output");
