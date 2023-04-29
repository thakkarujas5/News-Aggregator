const preferences = require('../db/preferencesDB')

function updatePreferences(req, res) {
    // Get the query parameters from the request body
    const { q } = req.body;

    preferences.push(q);

    // Send a response to confirm that the query parameters have been updated
    res.send('Query parameters have been updated successfully.');
}

module.exports = updatePreferences;