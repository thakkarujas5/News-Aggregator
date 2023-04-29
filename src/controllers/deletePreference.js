let preferences = require('../db/preferencesDB')

function deletePreference(req,res) {

    for(let i=0;i<preferences.length;i++)
    {
        if(preferences[i] === req.params.topic)
        {
            preferences.splice(i,1);
            break;
        }
    }

    res.send('Deleted successfully')
}

module.exports = deletePreference