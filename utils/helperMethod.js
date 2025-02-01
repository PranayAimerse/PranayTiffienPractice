const slugify = require('slugify');
const {v4: uuidv4} = require('uuid');

const count = "";

// Helper function to convert strings to camelCase
function toCamelCase(str) {
    return str
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
            index === 0 ? match.toLowerCase() : match.toUpperCase()
        )
        .replace(/\s+/g, '')
        .replace(/[^a-zA-Z0-9]/g, '');
}

// Helper function to convert strings to snake_case
function toSnakeCase(str) {
    // return str
    //     .replace(/\s+/g, '_')        // Replace spaces with underscores
    //     .replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)  // Convert uppercase letters to lowercase and prefix with an underscore
    //     .replace(/[^a-z0-9_]/g, '');  // Remove any non-alphanumeric characters except underscores

    return str
        .replace(/\s+/g, '_') // Replace spaces with underscores
        .replace(/([a-z0-9])([A-Z])/g, '$1_$2') // Add underscore between lowercase and uppercase letters
        .replace(/[^\w\s]/g, '') // Remove non-alphanumeric characters (except underscores)
        .toLowerCase(); // Convert everything to lowercase
}

const getLatestModelId = async (modelObject) => {
    const latestRecord = await modelObject.findOne({
        attributes: ['id'], // Fetch only the id column
        order: [['id', 'DESC']], // Order by id in descending order
    });
    return (latestRecord?.id || 0) + 1;
}

// Function to generate a random alphanumeric string of 8 characters
const generateAlphanumericToken = (count = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    // Generate a random 8-character alphanumeric string
    for (let i = 0; i < (count || 8); i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        token += chars[randomIndex];
    }

    return token;
};

// Function to generate a slug from a name
const generateSlug = async (modelName, name, count = 0) => {
    let slug = await slugify(name).toLowerCase(); // Slugify name and make it lowercase

    if (count) {
        slug = slug + "-" + count;
    } else {
        count = await getLatestModelId(modelName);
    }
    // Check if the generated token already exists in the database
    const existingSlug = await modelName.findOne({where: {"slug": slug}});
    if (existingSlug) {

        console.log('Slug already exists, regenerating...', count);
        return await generateSlug(modelName, name, (count + 1)); // Recursively try until a unique token is generated
    } else {
        // If the token is unique, return
        console.log(`Generated and inserted unique Slug: ${slug}`, count);
        return slug;
    }
};

// Function to generate a unique token
const generateUniqueToken = async (modelName, prefix = "", count = 0) => {

    let token = await generateAlphanumericToken();
    token = (prefix || "M") + "" + token;
    // Check if the generated token already exists in the database
    const existingToken = await modelName.findOne({where: {token}});

    if (existingToken) {
        console.log('Token already exists, regenerating...', count);
        return await generateUniqueToken(modelName, prefix, count + 1); // Recursively try until a unique token is generated
    } else {
        // If the token is unique, return
        console.log(`Generated and inserted unique token: ${token}`, count);
        return token;
    }
};

function compareDates(date1, date2) {
    // Normalize dates to ignore the time component
    if (date1 && date2) {
        const d1 = new Date(date1);
        const d2 = new Date(date2);

        // Compare the normalized dates
        if (d1 > d2) return 1;  // date1 is after date2
        if (d1 < d2) return -1; // date1 is before date2
    }

    return 0;               // dates are equal
}

function compareWithCurrentDate(otherDate) {
    // Get today's date without time
    const today = new Date();
    const currentDate = new Date(today.toDateString());

    // Normalize the other date to exclude the time
    const normalizedOtherDate = new Date(new Date(otherDate).toDateString());

    // Compare the dates
    if (normalizedOtherDate > currentDate) return 1;  // Other date is in the future
    if (normalizedOtherDate < currentDate) return -1; // Other date is in the past
    return 0;                                        // Dates are the same
}


function cleanMobileNumber(mobile) {
    // Step 1: Remove all non-numeric characters
    let cleaned = mobile.replace(/\D/g, '');

    // Step 2: Remove country code if present
    if (cleaned.startsWith('91')) {
        cleaned = cleaned.slice(2);
    }

    // Step 3: Validate the number (10 digits, starts with 6-9)
    const isValid = /^[6-9]\d{9}$/.test(cleaned);
    if (!isValid) {
        throw new Error('Invalid mobile number format');
        // return null;
    }

    return cleaned;
}

const cleanAndValidateEmail = (email) => {
    // Step 1: Trim and normalize
    let cleanedEmail = email.trim().toLowerCase();
    cleanedEmail = cleanedEmail.replace(/\s+/g, '').toLowerCase();

    // Step 2: Validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanedEmail)) {
        throw new Error('Invalid email format');
    }

    return cleanedEmail;
};

function getPaymentStatus(key = "") {
    const data = ['pending', 'processing', 'succeed', 'cancelled', 'failed'];
    if (key && key !== "") {
        if (data.includes(key)) {
            return key;
        } else {
            return null;
        }
    }
    return data;
}

function getAccountTypes(key = "") {
    const data = ['saving', 'current', 'fixed_deposit', 'recurring_deposit', 'demat', 'other'];
    if (key && key !== "") {
        if (data.includes(key)) {
            return key;
        } else {
            return null;
        }
    }
    return data;
}

module.exports = {
    getAccountTypes,
    getPaymentStatus,
    cleanMobileNumber,
    cleanAndValidateEmail,
    toSnakeCase,
    toCamelCase,
    generateSlug,
    generateUniqueToken,
    compareDates,
    compareWithCurrentDate
};
// module.exports = toCamelCase;