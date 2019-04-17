import {LocalStorage, Lots} from "../modules/lotsCatalog";
import {Pagination} from "../modules/pagination-v2";
import {SellPage} from "./sellview";


export class UI {
    createLotsSection () {
         document.getElementById('root').innerHTML = `
       <section id="lots" class="lots-section">
        <h2>AUCTION GALLERY</h2>
        <div class="container" id="card-container"></div>
        <div class="pagination">
            <div class="pagination_block">
                <span class="pagination_btn" id="button_prev">
                    <span class="lnr lnr-chevron-left"></span>
                </span>
                <span id="page_number" class="pagination_number"></span>
                <span class="pagination_btn" id="button_next">
                     <span class="lnr lnr-chevron-right"></span>
                </span>
            </div>
        </div>
        <div class="bottom-btn">
            <a href="/sell" class="bottom-btn_sell sell" >Sell here!</a>
            <button class="bottom-btn_info">Explore more!</button>
        </div>
    </section>
       `
    }
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



// pagination.getPagination(lots, ui.displayLots(lots));