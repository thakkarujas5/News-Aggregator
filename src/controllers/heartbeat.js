let cache = require('../db/cache')

function heartbeat() {

    for(let i = 0;i<cache.length;i++)
    {
        cache[i].timeLeft-=5;
    }

    cache = cache.filter(obj => obj.timeLeft > 0);

}

module.exports = heartbeat;