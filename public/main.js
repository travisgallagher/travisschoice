const form = document.querySelector("#locationForm")






const createBusUI = (businesses) => {
    console.log(businesses)
    // get container element
    businesses.forEach((business) => {
        console.log(business)
        // Create elements
        // assign elements values
        // append elements to dom 
    })
}

const getRestaurants = (e) => {
    e.preventDefault()
    let zipCode = document.querySelector("#zipCode").value
    let limit = document.querySelector("#limit").value
    axios.get(`http://localhost:4004/locations/${zipCode}/${limit}`)
        .then((response) => {
            createBusUI(response.data.businesses)
        })
        .catch((err) => {console.log(err)})
    }










form.addEventListener("submit", getRestaurants)



