import {Timer} from "../modules/timer";

let timer = new Timer();

export class UI {
    createLotsSection(obj, items) {
        document.getElementById('root').innerHTML = `
       <section id="lots" class="lots-section">
        <h2>AUCTION GALLERY</h2>
        <div class="lots-section_sort">
            <p>Total: ${obj.length} lots</p>
            <div>
                <label for="sorting">Sort by</label>
                <select name="sort" id="sorting">
                    <option value="Price: high-low">Price: high-low</option>
                    <option value="Price: low-high">Price: low-high</option>
                    <option value="Time: ending soonest">Time: ending soonest</option>
                    <option value="Time: new listed">Time: new listed</option>
                </select>
            </div>
        </div>
        <aside class="right-menu">
        <a href="#"><span class="lnr lnr-home"></span></a>
         <a href="#sell"><span class="lnr lnr-store"></span></a>
         <a href="#cart">
          <span class="lnr lnr-cart">
            <div class="cart-items">0</div>
          </span>
         </a>
        </aside>
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

    displayLots(lots) {
        function renderItems(lots) {
            cardContainer.innerHTML += `
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

        const cardContainer = document.getElementById('card-container');
        if (lots instanceof Array) {
            lots.forEach(el => {
                renderItems(el);
            });
        } else {
            if (lots === undefined) {
                document.getElementById('root').innerHTML = `
            <div class="empty">
            <p>Sorry, still no lots for selling!</p>
            <a href="#">Go to Bid!</a>
            </div>
            `
            } else {
                renderItems(lots);
            }
        }
    }

    async noLots() {
        document.getElementById('root').innerHTML = `
            <div class="empty">
            <p>Sorry, still no lots for selling!</p>
            <a href="#">Go to Bid!</a>
            </div>
            `
    }

    async checkForWinning() {
        const disable = (arr, id) => arr.filter(el => el.dataset.id === id).map(el => el.disabled = true);
        const query = (selector) => [...document.querySelectorAll(selector)];
        const time = query(".card_time-left");
        const bidBtn = query(".bid-btn");
        const input = query(".bid-input");
        time.forEach(el => {
            if (el.textContent === 'Lot sold') {
                let id = el.dataset.id;
                disable(bidBtn, id);
                disable(input, id);
            }
        })
    }
}