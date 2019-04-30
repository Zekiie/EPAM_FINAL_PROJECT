export class FullLotsInfo {
    async fullCardTemplate(lot) {
        const images = (lot) => lot.images.map((img,i) => `<div class="image_list-item"><img src="${img}" alt="${lot.title}" id=${i} class="image_list"></div>`);
        const root = document.getElementById('root');
        root.innerHTML = `
       <section class="full-card">
<!--            <div class="win-message">No need to bid. Your bid is win!</div>-->
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
                    <span>100</span>
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
                <p>Max bid:</p>

                <div class="full-card_bid">
                    <div class="full-card_bid-decr"></div>
                    <label for="bid-sum" class="full-card_bid-sum"></label>
                    <input type="number" min=1 id="bid-sum" class="full-card_sum-input">
                    <div class="full-card_bid-incr"></div>
                    <label for="bid-submit" ></label>
                    <input type="button" id="bid-submit" value="Bid" class="full-card_bid-submit">
                </div>
            </div>

    </section>
`
    }


}



