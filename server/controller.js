const axios = require('axios');

const axiosInstance = axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${process.env.YELP_API_KEY}`;
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json';

module.exports = axiosInstance;

function getLocations(req, res) {
    let {zipcode, limit} = req.params;

    axiosInstance.get(`/search?location=${zipcode}&limit=${limit}&category=food`)
    .then((response) => {
        res.send(response.data)
    })
    .catch(err => console.log(err))
}









module.exports = {
    getLocations,

}