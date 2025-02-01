// Function to search for matching values in the entire CSV data
const axios = require("axios");
const csvParser = require("csv-parser");
const path = require("path");
const fs = require("fs");
const {Sequelize} = require("sequelize");
const {toSnakeCase} = require("./helperMethod");

async function getDataObjectByWhereCondition(modelObject, condition, inKeyValueSet = null) {
    const option = {
        where: {
            ...(condition || {}),
            // Add the `whereIn` conditions to the query if they exist
            ...Object.keys(inKeyValueSet || {}).reduce((acc, column) => {
                acc[column] = {[Sequelize.Op.in]: inKeyValueSet[column]};
                return acc;
            }, {}),
        },
        limit: 1,
        offset: 0,
        order: [['id', 'desc']/*,['title', 'asc']*/]
    }
    return await modelObject.findOne(option);
}

function searchCsvData(data, searchTerm) {
    const results = [];
    const searchWords = searchTerm.toLowerCase().split(' ');  // Split the search term into individual words

    data.forEach((row, index) => {
        // Iterate over each key-value pair in the row
        // for (const key in row) {
        //     if (row.hasOwnProperty(key)) {
        //         const value = row[key];
        //
        //         // Check if the value includes the search term (case-insensitive)
        //         if (value.toString().toLowerCase().includes(searchTerm.toLowerCase())) {
        //             // Add the full row object when a match is found
        //             /*results.push({
        //                 rowIndex: index,   // Keep track of the row index
        //                 fullRow: row       // Return the entire row as an object
        //             });*/
        //             results.push(row);
        //             break; // Stop further checking of this row after the first match is found
        //         }
        //     }
        // }

        const rowValues = Object.values(row).map(value => value.toString().toLowerCase());

        // Check if every word is present in any of the values of the row
        // const allWordsMatched = searchWords.every(word =>
        //     rowValues.some(value => value.includes(word))
        // );
        // Check if any value in the row contains all the search words in the same column
        const allWordsMatched = rowValues.some(value => {
            return searchWords.every(word => value.includes(word)); // Every word must be present in the same value
        });

        if (allWordsMatched) {
            results.push(row);
        }
    });

    return results;
}


// Function to fetch and parse CSV data
async function fetchAndParseCSV(url) {
    try {
        // Fetch CSV file from the URL
        const response = await axios.get(url, {responseType: 'stream'});

        console.log('Response Headers:', response.headers);
        console.log('Response Content Type:', response.headers['content-type']);

        // Create a readable stream from the CSV content
        const readableStream = response.data;

        // Parse the CSV data
        const results = [];
        readableStream.pipe(csvParser({separator: ';'}))
            .on('data', (row) => {
                results.push(row);
            })
            .on('end', () => {
                console.log('CSV data parsed successfully:', results.length);
                return results;
            })
            .on('error', (err) => {
                console.error('Error parsing CSV:', err);
            });
        // return results;
    } catch (error) {
        console.error('Error fetching or parsing the CSV file:', error);
    }
}

// Call the function with the file URL
// Function to fetch and parse CSV from a URL (content-type 'text/plain' with semicolon delimiter)
async function fetchAndParseText(url) {
    try {
        // Fetch the CSV file as plain text
        const response = await axios.get(url, {responseType: 'text'});

        // Check if the content is actually plain text (CSV)
        if (response.headers['content-type'] !== 'text/plain' && !response.data) {
            throw new Error('The file is not of type text/plain or is empty.');
        }

        // Split the response into rows by newline
        const rows = response.data.split('\n');

        // Filter out non-data rows (empty lines, headers, etc.)
        // const validRows = rows.filter(row => row.trim() !== '' && row.includes(';')); // Only rows with semicolons

        // Filter rows that have data in at least one column
        const validRows = rows.filter(row => {
            const values = row.split(';').map(cell => cell.trim());
            return values.some(cell => cell !== ''); // Check if any cell in the row is not empty
        });

        // Slice the data based on offset and limit
        // const paginatedRows = validRows.slice(offset, offset + limit);


        // Parse the CSV data
        const headers = validRows[0].split(';').map(cell => cell.trim()); // First row as headers
        // const headers = paginatedRows[0].split(';').map(cell => cell.trim()); // First row as headers
        let company = "";

        return validRows.slice(1).map(row => {

            if (row.trim() !== '' && row.includes(';')) {
                const values = row.split(';').map(cell => cell.trim()); // Split row by semicolon
                // Map each row's values to the corresponding headers
                let tempObject = headers.reduce((acc, header, index) => {
                    const keyName2 = toSnakeCase(header); // Convert header to camelCase
                    acc[keyName2] = values[index] || ''; // Assign values to respective headers
                    return acc;
                }, {}); // Return the object representing the row

                return {...tempObject, company: company};
            } else {
                company = row.trim();
                company = row.replaceAll("\r", "");
            }
        }); // Return the parsed data as an array of arrays
    } catch (error) {
        console.error('Error fetching or parsing the CSV file:', error);
        return null;
    }
}

async function getUploadFileUrlMuter(filename) {
    if (filename) {
        // Custom header with filename
        const uploadFolder = path.join(__dirname, dir);

        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder);
        }
        const saveTo = path.join(uploadFolder, filename);

        const fileStream = await fs.createWriteStream(saveTo);
        await req.pipe(fileStream);
        return saveTo;
    } else {
        return null;
    }
}

async function uploadFile(req, filename, dir = 'uploads') {
    if (filename) {
        // Custom header with filename
        const uploadFolder = path.join(__dirname, dir);

        if (!fs.existsSync(uploadFolder)) {
            fs.mkdirSync(uploadFolder);
        }
        const saveTo = path.join(uploadFolder, filename);

        const fileStream = await fs.createWriteStream(saveTo);
        await req.pipe(fileStream);
        return saveTo;
    } else {
        return null;
    }
}


module.exports = {
    uploadFile,
    searchCsvData,
    fetchAndParseText,
    fetchAndParseCSV,
    getDataObjectByWhereCondition
}