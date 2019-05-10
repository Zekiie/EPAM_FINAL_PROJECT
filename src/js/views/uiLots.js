import {LocalStorage, Lots} from "../modules/lotsCatalog";
import {Pagination} from "../modules/pagination-v2";
import {SellPage} from "./sellview";
import {Timer} from "../modules/timer";

let timer = new Timer();
export class UI {
    createLotsSection () {
         document.getElementById('root').innerHTML = `
       <section id="lots" class="lots-section">
        <h2>AUCTION GALLERY</h2>
        <div class="container" id="card-container"></div>
        <div class="pagination">
            <div class="pagination_block">
                <span class="pagination_btn prev" id="button_prev">
                    <span class="lnr lnr-chevron-left"></span>
                    Previous
                </span>
                <span id="page_number" class="pagination_number"></span>
               
                <span class="pagination_btn next" id="button_next">
                 Next 
                     <span class="lnr lnr-chevron-right"></span>
                </span>
            </div>
        </div>
        <div class="bottom-btn">
            <a href="/#sell" class="bottom-btn_sell sell" >Sell here!</a>
            <button class="bottom-btn_info">Explore more!</button>
        </div>
    </section>
       `
    }
    displayLots(lots, itemPerPage) {
        return `
                <article class="card" data-id="${lots.lot_id}">
                <div class="card_time-left" data-id="${lots.lot_id}">${timer.shortVersion(lots)}</div>
                <a href="/#info/${lots.lot_id}">
                <img src="${lots.image}" alt="${lots.title}" class="card_img">
                <div class="card_details">
                    <h2>${lots.title}</h2>
                    <p class="price">$${lots.price === undefined ? lots.price = +lots.start_price : +lots.price}</p>
                    <div id="description-${lots.lot_id}" class="description">
                       ${lots.description}
                    </div>
                </div>
                </a>
                <div class="card_btn">
                    <label for="bid"></label>
                    <input id="bid" type="number" min="1" class="bid-input" data-id="${lots.lot_id}">
                    <input type="button" id="addBid-${lots.lot_id}" data-id="${lots.lot_id}" value="Bid" class="bid-btn">
                    <label for="info" class="info-label"></label>
                    <a href="/#info/${lots.lot_id}" id="info-${lots.lot_id}"  class="info-btn" data-id="${lots.lot_id}" > More details </a>
                </div>
            </article>
 `
    }
    async checkForWinning (){
        const disable = (arr, id) => arr.filter(el => el.dataset.id === id).map(el => el.disabled = true);
        const query = (selector) => [...document.querySelectorAll(selector)];
        const time = query(".card_time-left");
        const bidBtn = query(".bid-btn");
        const input = query(".bid-input");
        time.forEach( el => {
            if (el.textContent === 'Lot sold'){
                let id = el.dataset.id;
                disable(bidBtn, id);
                disable(input, id);
                // console.log(cardleft)
            }

        })
        // console.log(card)

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



// pagination.getPagination(lots, ui.displayLots(lots));