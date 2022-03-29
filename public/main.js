
const locForm = document.querySelector("#locationForm")
const hiddenClass = document.querySelector(".hidden")
const restCheck = document.querySelector("#checkbox")
let restTable = document.querySelector("#restTable")
let nameCol = document.querySelector("#name-col")
let priceCol = document.querySelector("#price-col")
let ratingCol = document.querySelector("#rating-col")
let tableHeader = document.querySelector("th")
let results = document.querySelector("#results")
let addChoiceBtn = document.querySelector("#add-choices")

let travisChooseBtn = document.querySelector("#travisBtn")


function createRow(business) {
    let tbody = document.querySelector(`#t-body`)

    let newRow = tbody.insertRow(); 

    let nameCell = newRow.insertCell();
    let nameText = document.createTextNode(`${business.name}`)
    nameCell.appendChild(nameText)
    
    let descCell = newRow.insertCell();
    for (let i = 0; i < business.categories.length; i++) {
        
        
        let descText = document.createTextNode(`${business.categories[i].title} `)
        descCell.appendChild(descText)
    }
    
    let priceCell = newRow.insertCell();
    let priceText = document.createTextNode(`${business.price}`)
    priceCell.appendChild(priceText)
    
    let ratingCell = newRow.insertCell();
    let ratingText = document.createTextNode(`${business.rating}`)
    ratingCell.appendChild(ratingText)
    
    let checkBoxCell = newRow.insertCell(); 
    let cb = document.createElement(`input`)
    cb.type = `checkbox`;
    cb.value = `${business.name}`
    cb.classList.add("checkbox");
    cb.id = JSON.stringify(business)
    
    checkBoxCell.appendChild(cb);
}


function getRandomRest (choice){
    // 1. get the choices from backend
    // 2. randomize them
    // 3. do something with the one you get back 
    
    console.log("function getting hit")
    axios.get(`http://localhost:4004/choices`)
        .then((response) => {
            console.log(response)
        let choicesArr = response.data.DB
        console.log(choicesArr)
        let arrLength = choicesArr.length
        let randomChoice_index = Math.floor(Math.random() * (arrLength))
        let finalChoice = choicesArr[randomChoice_index]
        console.log(finalChoice) 
        
        
    })
}

function createRowChoices(choice) {
    let tbody = document.querySelector(`#t-body-choices`)

    let newRow = tbody.insertRow(); 

    let nameCell = newRow.insertCell();
    let nameText = document.createTextNode(`${choice.name}`)
    nameCell.appendChild(nameText)
    
    let descCell = newRow.insertCell();
    for (let i = 0; i < choice.categories.length; i++) {
        
        
        let descText = document.createTextNode(`${choice.categories[i].title} `)
        descCell.appendChild(descText)
    }
    
    let priceCell = newRow.insertCell();
    let priceText = document.createTextNode(`${choice.price}`)
    priceCell.appendChild(priceText)
    
    let ratingCell = newRow.insertCell();
    let ratingText = document.createTextNode(`${choice.rating}`)
    ratingCell.appendChild(ratingText)
    
    let deleteBtnCell = newRow.insertCell();
    let deleteBtn = document.createElement(`button`)
    deleteBtn.innerText = "Delete"
    deleteBtn.classList.add("button")
    deleteBtn.classList.add("button-delete")
    deleteBtn.id = JSON.stringify(choice.id)
    deleteBtn.addEventListener("click", () => {
        axios.delete(`http://localhost:4004/choices/${choice.id}`).then((res) => {
        }).catch((err) => {
            console.error(err);
        }) 
    newRow.remove()
    })
    

    deleteBtnCell.appendChild(deleteBtn)
    // deleteBtn.onclick((e) => e.remove())
}

const createBusUI = (businesses) => {

    hiddenClass.classList.remove(`hidden`);

    businesses.forEach((business) => {
        createRow(business)

    })

    window.scrollTo(0, 1000); 
}

const addRest = () => {
        let checkboxes = document.querySelectorAll(".checkbox")
        let choices = [];
        console.log({checkboxes})
        checkboxes.forEach(element => {
            console.log(element)
            const elID = element.getAttribute('id')
        
            if(element.checked) {
                choices = [...choices, JSON.parse(elID)]
            } 
        });    
        axios.post('http://localhost:4004/choices', {choices}).then((res) => {
            const data = res.data.choices;
            data.forEach(restaurant => {
                createRowChoices(restaurant);
            });
        }).catch((err) => {
            console.error(err);
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

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1; 
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr")); 


    if (column !== 1) {
        sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        
        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    })
    } else {
        sortedRows = rows.sort((a, b) => {
        const aColPrice = parseFloat(a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().replace('$', ''));
        const bColPrice = parseFloat(b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().replace('$', ''));
        
        return aColPrice > bColPrice ? (1 * dirModifier) : (-1 * dirModifier);
    })}
    if (column !== 1) {
        sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
        
        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    })
    } else {
        sortedRows = rows.sort((a, b) => {
        const aColPrice = parseFloat(a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().replace('$', ''));
        const bColPrice = parseFloat(b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().replace('$', ''));
        
        return aColPrice > bColPrice ? (1 * dirModifier) : (-1 * dirModifier);
    })
    }

    // Remove all existing TRs from the table
    while(tBody.firstChild) {
        tBody.removeChild(tBody.firstChild); 
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows); 

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc")); 
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-asc", asc)
    table.querySelector(`th:nth-child(${ column + 1})`).classList.toggle("th-sort-desc", !asc)

    }

document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement; 
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell); 
        const currentIsAscending = headerCell.classList.contains("th-sort-asc"); 

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending); 
    })
})

sortTableByColumn(document.querySelector("table"), 0); 
sortTableByColumn(document.querySelector("table"), 1); 
sortTableByColumn(document.querySelector("table"), 2); 
sortTableByColumn(document.querySelector("table"), 3); 
sortTableByColumn(document.querySelector("table"), 4); 




locForm.addEventListener("submit", getRestaurants)
addChoiceBtn.addEventListener("click", addRest)
travisChooseBtn.addEventListener("click", getRandomRest)

