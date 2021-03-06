const fs = require("fs");
const path = require("path");
const util = require('util');
fs.readFileAsync = util.promisify(fs.readFile);

let rules = {
    "flag" : function(value) { return typeof value === "boolean" ? null : "is not a boolean"; },
    "myPromises" : function(value) { return value instanceof Array ? null : "is not an array"; },
    "element" : function(value) { return typeof value === "object" ? null : "is not an object"; },
    "screenshot" : function(value) { return value === null ? null : "is not null"; },
    "allElementsText" : function(value) { return value.includes("const") ? null : "doesn't contain string \"const\""; },
    "counter" : function(value) { return value > 10 ? null : "is not greater than 10"; },
    "config" : function(value) { return value === "Common" ? null : "doesn't equal to \"Common\""; },
    "const" : function(value) { return value.toLowerCase() === "FiRst".toLowerCase() ? null : "doesn't equal to \"FiRst\" (case insensitive)"; },
    "parameters" : function(value) { return value instanceof Array ? (value.length === 8 ? null : "doesn't contain 8 elements") : "is not an array"; },
    "description" : function(value) { return typeof value === "string" ? (value.length > 5 ? (value.length < 13 ? null : "length is not lesser than 13") : "length is not greater than 5") : "is not a string"; }
};

async function validateJson(filePath) {
    let contents = await fs.readFileAsync(filePath);
    let json = JSON.parse(contents, 3);
    
    let errors = [];
    for (const key in rules) {
        const rule = rules[key];
        if (key in json) {
            let propertyValue = json[key];
            let result = rules[key](propertyValue);
            if (result) {
                errors.push("Property '" + key + "' " + result + ": " + propertyValue);
            }
        } else {
            errors.push("Property '" + key + "' is missing");
        }
    }

    if (errors.length === 0) {
        console.log("OK");
    } else {
        const errorFileName = path.basename(filePath, ".json") + ".txt";
        let content = errors.join("\r\n");
        fs.writeFile("./output/" + errorFileName, content, function(err) {
            if(err) {
                console.error(err);
            }
        }); 
        console.log(path.resolve(errorFileName));
    }
}



validateJson("./input/1.json");
validateJson("./input/2.json");
validateJson("./input/3.json");
validateJson("./input/4.json");
validateJson("./input/valid.json");