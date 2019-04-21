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
                <h3>Current bid: </h3>
                <p>Item condition: ${lot.condition}</p>
                <p>Description: ${lot.description}</p>
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

    async timer() {
        function getData() {

            let today = new Date(),
                till = new Date('May 1 2019 06:30:59'),
                diverence = till.getTime() - today.getTime(),
                secondLeft = Math.floor(diverence / 1000),
                minLeft = Math.floor(secondLeft / 60),
                hoursLeft = Math.floor(minLeft / 60),
                daysLeft = Math.floor(hoursLeft / 24),
                weekLeft = Math.floor(daysLeft / 7);
            secondLeft %= 60;
            minLeft %= 60;
            hoursLeft %= 24;
            daysLeft %= 7;

            if (hoursLeft < 10) {
                hoursLeft = "0" + hoursLeft;
            }
            if (minLeft < 10) {
                minLeft = "0" + minLeft;
            }
            if (secondLeft < 10) {
                secondLeft = "0" + secondLeft;
            }
            const timeLeft = {weekLeft, daysLeft, hoursLeft, minLeft, secondLeft}
            console.log(timeLeft, timeInput);
            id('weeks').innerText = timeLeft.weekLeft;
            id('days').innerText = timeLeft.daysLeft;
            id('hours').innerText = timeLeft.hoursLeft;
            id('mins').innerText = timeLeft.minLeft;
            id('seconds').innerText = timeLeft.secondLeft;
            setTimeout(getData, 1000);
        }

        getData()
    }

    imageGallery() {
        const images = [...document.querySelectorAll('.image_list img')];
        const imgBig = document.querySelector('.selected_img');
        images.map((img) => {
            img.addEventListener('click', () => {
                imgBig.src = img.src;
                if (imgBig.src === img.src) {
                    img.className = 'active'
                } else {
                    img.style.opacity = '1';
                }
            })
        })
    }
}



