const axios = require(`axios`)

const authenticatedAxios = axios.create({
    baseURL: "https://api.yelp.com/v3/businesses",
});

authenticatedAxios.defaults.headers.common['Authorization'] = `Bearer ${process.env.YELP_API_KEY}`;
authenticatedAxios.defaults.headers.common['Content-Type'] = 'application/json';

module.exports = authenticatedAxios; 

