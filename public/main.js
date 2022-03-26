const locForm = document.querySelector("#locationForm")
const hiddenClass = document.querySelector(".hidden")
const restCheck = document.querySelector("#checkbox")
let restTable = document.querySelector("#restTable")
let nameCol = document.querySelector("#name-col")
let priceCol = document.querySelector("#price-col")
let ratingCol = document.querySelector("#rating-col")
let tableHeader = document.querySelector("th")

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
                    <label for="checkbox"> Add to your list</label><br>
                    <input type="checkbox" name="checkbox" class="checkbox" >
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



/**
 * Sorts a HTML table.
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort 
 * @param {boolean} asc Determines if the sorting will be in ascending order
 */

function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1; 
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr")); 

    if (column !== 1) {
        sortedRows = rows.sort((a, b) => {
            const aColText = a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim();

            // console.log(aColText)
            // console.log(bColText)

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
            
    })
    // PROBLEM WITH ELSE STATEMENT, SORTING WORKS WHEN I COMMENT OUT ELSE
    //     } else {
    //     sortedRows = rows.sort((a, b) => {
    //         const aColPrice = parseFloat(a.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().replace('$', ''));
    //         const bColPrice = parseFloat(b.querySelector(`td:nth-child(${ column + 1 })`).textContent.trim().replace('$', ''));
    
    //     // console.log(aColPrice)
    //     // console.log(bColPrice)
    //      return aColPrice > bColPrice ? (1 * dirModifier) : (-1 * dirModifier);
    // }) 

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





locForm.addEventListener("submit", getRestaurants)



