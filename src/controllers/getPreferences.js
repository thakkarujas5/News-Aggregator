const preferences = require('../db/preferencesDB');

function getPreferences(req, res) {

    res.send(preferences);
}

module.exports = getPreferences;

