const locForm = document.querySelector("#locationForm")
const hiddenClass1 = document.querySelector(".hidden1")
const hiddenClass2 = document.querySelector(".hidden2")
const hiddenClass3 = document.querySelector(".hidden3")
const hiddenClass4 = document.querySelector(".hidden4")
const introSection = document.querySelector(`.intro-sec`)
let addChoiceBtn = document.querySelector("#add-choices")
let travisChooseBtn = document.querySelector("#travisBtn")
let displayDiv = document.getElementById("final-div")
let getStartedBtn = document.getElementById("get-started")
let submitMessage = document.querySelector("#contact-form")
let homeBtn = document.querySelector("#home-button")
let logo = document.querySelector("#logo")
let redo = document.querySelector("#redo")

const getStarted = (e) => {
    hiddenClass4.classList.remove(`hidden4`)
    introSection.classList.add(`hidden5`)
}

const getRestaurants = (e) => {
    e.preventDefault()
    let zipCode = document.querySelector("#zipCode").value
    let limit = document.querySelector("#limit").value
    axios.get(`/locations/${zipCode}/${limit}`)
        .then((response) => {
            createBusUI(response.data.businesses)
        })
        .catch((err) => {console.log(err)})
    }

const createBusUI = (businesses) => {
    hiddenClass1.classList.remove(`hidden1`);
    businesses.forEach((business) => {
        createRow(business)
    })
    window.scrollTo(0, 1000); 
}

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
    cb.name = "check"
    cb.value = `${business.name}`
    cb.classList.add("checkbox");
    cb.id = JSON.stringify(business)
    checkBoxCell.appendChild(cb);
}

function checkUncheck(main) {
    all = document.getElementsByName("check"); 
    for (let i = 0; i < all.length; i++) {
        all[i].checked = main.checked; 
    }
}

const addRest = () => {
    hiddenClass1.classList.add(`hidden1`);
    hiddenClass4.classList.add(`hidden4`);
    hiddenClass2.classList.remove(`hidden2`)
    
    let checkboxes = document.querySelectorAll(".checkbox")
    let choices = [];
    checkboxes.forEach(element => {
        console.log(element)
        const elID = element.getAttribute('id')
        if(element.checked) {
            choices = [...choices, JSON.parse(elID)]
        } 
    });    
    axios.post('/choices', {choices}).then((res) => {
        const data = res.data.choices;
        data.forEach(restaurant => {
            createRowChoices(restaurant);
        });
    }).catch((err) => {
        console.error(err);
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
        axios.delete(`/choices/${choice.id}`).then((res) => {
        }).catch((err) => {
            console.error(err);
        }) 
    newRow.remove()
    })
    deleteBtnCell.appendChild(deleteBtn)
    window.scrollTo(0, document.body.scrollHeight); 

}

function getRandomRest (choice){
    axios.get(`/choices`)
        .then((response) => {
        let choicesArr = response.data.DB
        let arrLength = choicesArr.length
        let randomChoice_index = Math.floor(Math.random() * (arrLength))
        let finalChoice = choicesArr[randomChoice_index]

        createFinalCard(finalChoice)

        hiddenClass2.classList.add(`hidden2`)
        hiddenClass3.classList.remove(`hidden3`)
        displayDiv.scrollIntoView(true); 
        
    })
}

function createFinalCard(restaurant) {
    const finalCard = document.createElement('div')
    finalCard.classList.add('final-card')
    finalCard.innerHTML = `
    <br>
    <h1 class="header">${restaurant.name}</h1>
    
    <br>
    <img alt='restaurant image' src=${restaurant.image_url} class="restaurant-image"/>
    
    <br>
    <h4>Phone Number: </h4>
    <p class="phone">${restaurant.phone}</p>
    
    <br>
    <h4>Address: </h4>
    <p class="address"> ${restaurant.location.address1}, 
    <br>${restaurant.location.city}, ${restaurant.location.state}, ${restaurant.location.zip_code} </p>
    
    <br>
    <h4>Type of transactions: </h4>
    <p>${restaurant.transactions[0]}, ${restaurant.transactions[1]}</p>
    
    <br>
    <h4>Website on Yelp: </h4>
    <p class="url"><a href="${restaurant.url}">${restaurant.name}</a></p>
    <br>
    `
    displayDiv.appendChild(finalCard)
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

    while(tBody.firstChild) {
        tBody.removeChild(tBody.firstChild); 
    }

    tBody.append(...sortedRows); 

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

function handleSubmit () {
    const inputs = document.querySelectorAll(".loginTxt")
    const firstName = document.querySelector("#fname").value
    inputs.forEach(input => {
        input.value = ""; 
    }); 
    window.alert(`${firstName} your message was sent successfully! Thank you for the feedback!`)
    redirectHome()
}; 

function login() {
    const inputs = document.querySelectorAll(".loginTxt")
    const userName = document.querySelector("#user-name").value
    inputs.forEach(input => {
        input.value = ""; 
    }); 
    window.alert(`Welcome back ${userName}!`)
    redirectHome()
}

function signUp() {
    const inputs = document.querySelectorAll(".loginTxt")
    const firstName = document.querySelector("#fname").value
    const lastName = document.querySelector("#lname").value
    inputs.forEach(input => {
        input.value = ""; 
    }); 
    window.alert(`Welcome to Travis's Choice ${firstName} ${lastName}!`)
    redirectLogin()
}

function redirectLogin() {
    location.href = "./login"
}

function redirectHome(e) {
    location.href = "./"
}

redo.addEventListener("click", getRandomRest)
logo.addEventListener("click", redirectHome)
getStartedBtn.addEventListener("click", getStarted); 
sortTableByColumn(document.querySelector("table"), 0); 
locForm.addEventListener("submit", getRestaurants);
addChoiceBtn.addEventListener("click", addRest);
travisChooseBtn.addEventListener("click", getRandomRest); 
homeBtn.addEventListener("click", redirectHome)