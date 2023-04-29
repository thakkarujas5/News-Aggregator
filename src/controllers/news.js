let cache = require('../db/cache')
const preferences = require('../db/preferencesDB')
const {
    default: axios
} = require('axios');

async function getNews(req, res) {

    try {

        let result = [];
       

        for(let i = 0;i<preferences.length;i++) {

            let url = 'https://newsapi.org/v2/everything?';
            const tempRes = [];

            if (preferences[i]) url += `q=${preferences[i]}`;

            console.log(url);

          for(let z = 0;z<cache.length;z++) {

                if(cache[z].topic === preferences[i]) {

                    cache[z].timeLeft = 2000;
                    tempRes.push(cache[z])
                   
                }
            }

            if(tempRes.length>0) {
                result = [result, ...tempRes];
                continue;
            }

            const response = await axios.get(url, {
                headers: {
                    'x-api-key': 'e7be97d2dfbb4c00b97aa09035ab5d14'
                }
            });

            const resp = response.data.articles;

            console.log(resp.length)

            let len = resp.length
            for(let j=0;j<len;j++) {

               resp[j].topic = preferences[i]
               resp[j].timeLeft = 2000;
            }

            cache = [cache, ...resp]


            result.push(resp);

        }

        res.send(result)

    } catch (error) {

        console.error(error);
        res.status(500).send('Internal Server Error');

    }
}

module.exports = getNews