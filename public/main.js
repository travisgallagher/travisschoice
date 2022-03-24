const form = document.querySelector("#locationForm")
const busGrid = document.querySelector("#bus-grid")
const hiddenClass = document.querySelector(".hidden")


const choices = []

const createBusUI = (businesses) => {
    console.log(businesses)
    
    busGrid.innerHTML = ``
    hiddenClass.classList.remove(`hidden`);

    businesses.forEach((business) => {
        console.log(business)
        let busElement =  `
    
            <div class="hidden grid-item outline">
                <div class="hidden grid-item" id="name">${business.name}</div>
                <div class="hidden grid-item" id="price">${business.price}</div>  
                <div class="hidden grid-item" id="rating">${business.rating}</div>
                <div class="hidden grid-item"> 
                    <input type="checkbox" class="checkbox" id="busId" onclick="addRest(${business.id})">
                </div>
            </div>`
        busGrid.innerHTML += busElement
    
    
    })
}

const addRest = (id) => {
        let index = choices.findIndex(business => business.id === id)
        choices.push(choices[index])
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



