# Task
Take any library from npm that can save data in .xlsx format. Create a function that can convert all .json files from the given folder into 1 .xlsx file (catch all nesting). That function should take 2 parameters:
First: path to the folder with json files;
Second: path to folder where .xlsx file will be created.
Example: xlsxConverter(‘./some/long/path’, ‘./another/long/path’);

* Additional folders and files were added for clarity.

# Solution
Created two recursive functions: one to process folders and files and second to process JSON object. Each function appends two dimension array that represents cells in a sheet. Every nested element (both folders and objects properties) is padded to keep tree structure.  