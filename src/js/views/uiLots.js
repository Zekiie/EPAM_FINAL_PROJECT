import {LocalStorage, Lots} from "../modules/lotsCatalog";
import {Pagination} from "../modules/pagination-v2";
import {SellPage} from "./sellview";


export class UI {

    displayLots(lots, itemPerPage) {
        let template = (lots) => {
        return `
                <article class="card" data-id="${lots.id}">
                <img src="${lots.image}" alt="${lots.title}" class="card_img">
                <div class="card_details">
                    <h2>${lots.title}</h2>
                    <p>$${lots.start_price}</p>
                    <div id="description-${lots.id}" class="description">
                       ${lots.description}
                    </div>
                </div>
                <div class="card_btn">
                    <label for="bid"></label>
                    <input id="bid" type="number" class="bid-input">
                    <input type="button" id="addBid-${lots.id}" value="Bid" class="bid-btn">
                    <label for="info" class="info-label"></label>
                    <input type="button" id="info-${lots.id}" value="More details" class="info-btn">
                </div>
            </article>
 `
        };
        let pagination = new Pagination();
        Pagination.createLotsSection();
        pagination.getPagination(lots, template, itemPerPage);
    }
    getBagButtons() {

        const card = [...document.querySelectorAll('.card')];
        card.forEach( lot => {
            let id = lot.dataset.id;
            //check if products in bag cart
            // let inCart = cart.find( item => item.id === id);

        })
    }
    addLots () {
        const add = [...document.querySelectorAll('.sell')];

    }
}

document.addEventListener('DOMContentLoaded', () => {
    //two instance for class, no need storage instance, because there will be only static methods
    const ui = new UI(),
       lotsCatolog = new Lots(),
        storage = new LocalStorage();

    //get all lots
    lotsCatolog.getLots().then(lots =>  {
        ui.displayLots(lots, 6);
        LocalStorage.saveLots(lots);
        const sellPage = new SellPage();
        sellPage.displaySellForm();
    }).then(() => {
        ui.addLots();
        ui.getBagButtons();
    });

});

// pagination.getPagination(lots, ui.displayLots(lots));