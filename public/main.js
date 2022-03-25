const form = document.querySelector("#locationForm")
const hiddenClass = document.querySelector(".hidden")
const restCheck = document.querySelector("#checkbox")
let restTable = document.querySelector("#restTable")

const choices = []

const createBusUI = (businesses) => {
    console.log(businesses)

    hiddenClass.classList.remove(`hidden`);

    businesses.forEach((business) => {
        console.log(business)

        let restTemplate = `
            <tr>
                <td>${business.name}</td>
                <td>${business.price}</td>
                <td>${business.rating}</td>
                <td> 
                    <input type="checkbox" name="checkbox" id="checkbox" onclick="addRest(${business.id})" value="restSelected">
                    <label for="checkbox"> Add to list of possible meal choices </label><br>
                </td>
            </tr>`; 

        restTable.innerHTML += restTemplate
    })

    window.scrollTo(0, 1000); 
}

const addRest = (id) => {
        if (restCheck === true) {
            let index = choices.findIndex(business => business.id === id)
            choices.push(choices[index])
        }
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



