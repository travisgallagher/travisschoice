const authenticatedAxios = require(`./axiosConfig.js`)
let DB = [];

function getLocations(req, res) {
    
    const {zipCode, limit} = req.params
        authenticatedAxios.get(`/search?location=${zipCode}&limit=${limit}&category=food`)
        .then((response) => {
            res.send(response.data)
        })
        .catch(err => console.log(err))
}

function saveChoices(req, res) {
    DB = req.body.choices;
    res.send(req.body);
}

function getChoices(req, res) {
    res.send({status:200, DB});
}
function deleteChoice(req, res) {
    const {id} = req.params
    const updatedChoices = DB.filter((c) => c.id !== id);
    DB = updatedChoices;
    res.send({status:200, updatedChoices});
}

module.exports = {
    getLocations,
    saveChoices,
    getChoices,
    deleteChoice
}
