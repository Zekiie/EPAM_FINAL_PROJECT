import {CartStorage} from "./lotsCatalog";

let lotStorage = new CartStorage();



function setTimer(endDate) {
    let today = new Date(),
        diverence = endDate.getTime() - today.getTime(),
        secondLeft = Math.floor(diverence / 1000),
        minLeft = Math.floor(secondLeft / 60),
        hoursLeft = Math.floor(minLeft / 60),
        daysLeft = Math.floor(hoursLeft / 24),
        weekLeft = Math.floor(daysLeft / 7);
    secondLeft %= 60;
    minLeft %= 60;
    hoursLeft %= 24;
    daysLeft %= 7;

    // if (hoursLeft < 10) {
    //     hoursLeft = "0" + hoursLeft;
    // }
    if (minLeft < 10) {
        minLeft = "0" + minLeft;
    }
    if (secondLeft < 10) {
        secondLeft = "0" + secondLeft;
    }

    return {weekLeft, daysLeft, hoursLeft, minLeft, secondLeft};
}


export class Timer {
    async timer(lotObj) {
        const id = (id) => document.getElementById(id),
            date = lotObj.end_date,
            time = lotObj.end_time,

            endDate = new Date(date + " " + time);
        // date.min = dateFormat(today);

        function dateFormat(date) {
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
            let fullDate = year + "-" + month + "-" + day;
            return fullDate;
        }

        function goTimer() {

            const timeLeft = setTimer(endDate);

            if (timeLeft.weekLeft < 0 || isNaN(timeLeft.weekLeft)) {
                timeLeft.weekLeft = 0;
            }
            if (timeLeft.daysLeft < 0 || isNaN(timeLeft.daysLeft)) {
                timeLeft.daysLeft = 0;
            }
            if (timeLeft.hoursLeft < 0 || isNaN(timeLeft.hoursLeft)) {
                timeLeft.hoursLeft = 0;
            }
            if (timeLeft.minLeft < 0 || isNaN(timeLeft.minLeft)) {
                timeLeft.minLeft = 0;
            }
            if (timeLeft.secondLeft < 0 || isNaN(timeLeft.secondLeft)) {
                timeLeft.secondLeft = 0;
            }

            id('weeks').innerText = timeLeft.weekLeft;
            id('days').innerText = timeLeft.daysLeft;
            id('hours').innerText = timeLeft.hoursLeft;
            id('mins').innerText = timeLeft.minLeft;
            id('seconds').innerText = timeLeft.secondLeft;

            setTimeout(goTimer, 1000);

        }

        goTimer()
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

    shortVersion(lotObj) {
        const date = lotObj.end_date,
            time = lotObj.end_time,
            endDate = new Date(date + " " + time),
            timeLeft = setTimer(endDate);
        const id = lotObj.lot_id;
        if (+timeLeft.weekLeft === 0 && +timeLeft.daysLeft === 0 && +timeLeft.hoursLeft === 0) {
            return `${timeLeft.minLeft} minutes left`;
        } else if (+timeLeft.weekLeft === 0 && +timeLeft.daysLeft === 0) {
            return `${timeLeft.hoursLeft} hours left`;
        } else if (+timeLeft.weekLeft === 0) {
            return `${timeLeft.daysLeft} days left`;
        } else if (isNaN(timeLeft.weekLeft) || isNaN(timeLeft.daysLeft) || isNaN(timeLeft.hoursLeft) || isNaN(timeLeft.minLeft) || isNaN(timeLeft.secondLeft)) {
            return `Lot sold`;
        } else {
            return `${timeLeft.weekLeft} weeks left`;
        }
    };
    soldLots (lots) {
        lots.forEach( el => {
            const date = el.end_date,
                time = el.end_time,
                endDate = new Date(date + " " + time),
                timeLeft = setTimer(endDate);
            if (isNaN(timeLeft.weekLeft) || isNaN(timeLeft.daysLeft) || isNaN(timeLeft.hoursLeft) || isNaN(timeLeft.minLeft) || isNaN(timeLeft.secondLeft)) {
                el.status = 'sold';
            }
        });
        lotStorage.refreshLots(lots);
    }
}