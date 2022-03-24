let userSelectedCheck = []



function loadLocationUI(businesses) {
    const busContainer = document.querySelector(`#busUI`)
    businesses.forEach(business => {
        return `
        <div class="grid-item name">${name}</div>
        <div class="grid-item price">${price}</div>  
        <div class="grid-item rating">${rating}</div>
        <div class="grid-item checkbox"> 
            <input type="checkbox" id="" name="bus1" value="bus1">
        </div>
        `
    })
}

document.querySelector(`#locationForm`).addEventListener(`submit`, (e) => {
    e.preventDefault(); 

    let zipCode = document.querySelector(`#zipCode`).value;
    let limit = document.querySelector(`#limit`).value;
    console.log(zipCode, limit)
    axios.get(`http://localhost:4004/locations/${zipCode}/${limit}`)
        .then((response) => {
            loadLocationUI(response.data.businesses)
        })
})

