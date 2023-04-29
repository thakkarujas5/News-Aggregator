require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

// Middleware to verify JWT
const verifyPref = (req, res, next) => {

    const {
        q,
        searchIn,
        sources,
        domains,
        excludeDomains,
        from,
        to,
        language,
        sortBy,
        pageSize,
        page
    } = req.body;

    if (searchIn) {

        if (searchIn !== 'title' && searchIn !== 'description' && searchIn !== 'content') {

            next('searchIn Parameter is wrongly passed');
        }

    }

    if (from && to) {

        let from_date = new Date(from);
        let to_date = new Date(to);

        // Check if the variables are valid dates
        if (isNaN(from_date.getTime()) || isNaN(to_date.getTime())) {
            
            next('Invalid date format');
        } else {

            // Check if "from" is less than or equal to "to"
            if (from_date <= to_date) {
                console.log("Valid date range");

            } else {
                console.log("Invalid date range: 'from' is after 'to'");
                next("Invalid date range: 'from' is after 'to'")
            }
        }
    }


    next()
};

module.exports = verifyPref