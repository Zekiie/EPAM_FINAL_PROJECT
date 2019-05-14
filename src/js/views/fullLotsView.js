export class FullLotsInfo {
    async fullCardTemplate(lot) {
        const images = (lot) => lot.images.map((img, i) => `<div class="image_list-item"><img src="${img}" alt="${lot.title}" id=${i} class="image_list"></div>`);
        const root = document.getElementById('root');
        root.innerHTML = `
       <section class="full-card">
            <div class="win-message" id="win-popup">No need to bid. Your bid is win!</div>
            <div class="full-card_image">

                <div class='selected'>
                    <img src="${lot.image}" alt="${lot.title}" class="selected_img" id='main'>
                </div>
                <div class="image_list">
                    <div class="image_list-item">
                    <img src="${lot.image}" alt="${lot.title}" class="image_list active" id='main' >                    </div>
                    ${images(lot).join('')}
                    
                </div>
            </div>
            <div class="full-card_info">
                <h2>${lot.title}</h2>
                <h3>Current bid: 
                    <span>$${lot.price === undefined ? lot.price = +lot.start_price : +lot.price}</span>
                </h3>
                
                <p>Item condition: <span>${lot.condition}</span></p>
                <p>Description: <span>${lot.description}</span></p>
                <p>Time left:</p>
                <div class="full-card_info-time">
                    <span class="time_n" id='weeks'></span>
                    <span class="time_n" id='days'></span>
                    <span class="time_n" id='hours'></span>
                    <span class="time_n" id='mins'></span>
                    <span class="time_n" id='seconds'></span>
                    <span>Weeks</span>
                    <span>Days</span>
                    <span>Hours</span>
                    <span>Minutes</span>
                    <span>Seconds</span>
                </div>
                <p>Auction ends: ${lot.end_date}</p>
                <p>Current bid: </p>
<!--                <p>Max bid:</p>-->

                <div class="full-card_bid">
                    <div class="full-card_bid-decr"></div>
                    <label for="bid-sum" class="full-card_bid-sum"></label>
                    <input type="number" min=1 id="bid-sum" class="full-card_sum-input">
                    <div class="full-card_bid-incr"></div>
                    <label for="bid-submit" ></label>
                    <input type="button" id="bid-submit" value="Bid" class="full-card_bid-submit bit-btn">
                </div>
            </div>

    </section>
`
    }

    checkTimer() {
        const decrBid = [...document.querySelectorAll('.time_n')];
        const bidbtn = document.getElementById('bid-submit');
        const btnInput = document.getElementById('bid-sum');
        const decr = document.querySelector('.full-card_bid-decr');
        const incr = document.querySelector('.full-card_bid-incr');
        const popup = document.getElementById('win-popup');
        if (decrBid.every(span => span.textContent === '0')) {
            bidbtn.disabled = true;
            btnInput.disabled = true;
            decr.addEventListener('click', () => btnInput.value = '');
            incr.addEventListener('click', () => btnInput.value = '');

            popup.style.visibility = "visible";
        }
    }

    addBid(lot, fullLots) {
        const bidbtn = document.getElementById('bid-submit');
        const decrBid = document.querySelector('.full-card_bid-decr');
        const incrBid = document.querySelector('.full-card_bid-incr');
        const bidInput = document.getElementById('bid-sum');

        let bid = 0;
        if (bid !== 0) {
            bid = 0;
        }
        decrBid.addEventListener("click", () => {
            if (bidInput.value === '' || bidInput.value <= 0.01) {
                bidInput.value = 0;
            } else {
                bidInput.value--;
                bid = bidInput.value;
            }
        });
        incrBid.addEventListener("click", () => {
            if (bidInput.value === '' || bidInput.value <= 0.01) {
                bidInput.value = 1;
            } else {
                bidInput.value++;
                bid = bidInput.value;
            }
        });
        bidInput.addEventListener('change', () => {
            if (+bidInput.value < 0) {
                bid = 0.01;
            }
            bid += +bidInput.value;
        });

        bidbtn.addEventListener('click', () => {
            const id = bidbtn.dataset.id;
            lot.price = +lot.price + +bid;
            console.log(lot.price);
            localStorage.removeItem('lots');
            localStorage.setItem('lots',  JSON.stringify(fullLots));
            document.location.reload(true);
        })
    }
}


