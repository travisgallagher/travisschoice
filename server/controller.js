const authenticatedAxios = require(`./axiosConfig.js`)

function getLocations(req, res) {
    
    const {zipCode, limit} = req.params

    //// now we are going to hit 3rd party API yelp data
        authenticatedAxios.get(`/search?location=${zipCode}&limit=${limit}&category=food`)
        .then((response) => {
            res.send(response.data)
            console.log(response.data)
        })
        .catch(err => console.log(err))
}

module.exports = {
    getLocations
}
