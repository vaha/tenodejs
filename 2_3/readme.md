# Task
Create a function that will watch for given folder and check if files with .csv format are changed or created. All changed data should be written to a json file. All others files should be ignored except .csv files.

# Solution
Only tracks file creation and modifications. Due to a bug in API (windows/node) added a small hack (delay) to prevent duplicate events.
Result file contains list of JSON objects with changes (like in other loggers, not a single JSON - to prevent performance issues related to dealing with accumulated data).