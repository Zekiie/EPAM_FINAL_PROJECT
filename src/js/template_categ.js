import {lotsCatalog} from "./json/lots";

console.log(lotsCatalog);

let n = 9;
function lotTemplate (obj) {
    return `
<div class="card">
                <img src="${obj.img}" alt="${obj.title}" class="card_img">
                <div class="card_details">
                    <h2>${obj.title}</h2>
                    <p>${obj.price}</p>
                    <div id="description" class="description">
                       ${obj.description}
                    </div>
                </div>
                <div class="card_btn">
                    <label for="bid"></label>
                    <input id="bid" type="number" class="bid-input">
                    <input type="button" id="addBid" value="Bid" class="bid-btn">
                    <label for="info" class="info-label"></label>
                    <input type="button" id="info" value="+  More details" class="info-btn">
                </div>
            </div>
`
}


console.log(lotsCatalog.length);

document.getElementById('card-container').innerHTML = `
${lotsCatalog.map(lotTemplate).join('')}
<div class=pagination">${Math.ceil(lotsCatalog.length/n)}</div>
`

const matrix = [];

matrix.push(lotsCatalog.map(lotTemplate));
console.log(matrix[1]);