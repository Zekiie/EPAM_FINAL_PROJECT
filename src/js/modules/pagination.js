import {lotsCatalog} from "../json/lots";

function lotTemplate(obj) {
    return `
<div class="card">
                <img src="${obj.img}" alt="${obj.title}" class="card_img">
                <div class="card_details">
                    <h2>${obj.title}</h2>
                    <p>$${obj.initPrice}</p>
                    <div id="description" class="description">
                       ${obj.description}
                    </div>
                </div>
                <div class="card_btn">
                    <label for="bid"></label>
                    <input id="bid" type="number" class="bid-input">
                    <input type="button" id="addBid" value="Bid" class="bid-btn">
                    <label for="info" class="info-label"></label>
                    <input type="button" id="info" value="More details" class="info-btn">
                </div>
            </div>
`
}

const prevButton = document.getElementById('button_prev');
const nextButton = document.getElementById('button_next');
const clickPageNumber = document.querySelectorAll('.clickPageNumber');

(function () {
    function Pagination() {

        let current_page = 1;
        let records_per_page = 6;

        this.init = () => {
            changePage(1);
            pageNumbers(pageMove(+current_page, numPages()));
            selectedPage();
            clickPage();
            addEventListeners();
        };

        let addEventListeners = () => {
            prevButton.addEventListener('click', prevPage);
            nextButton.addEventListener('click', nextPage);
        };

        let selectedPage = () => {
            let page_number = document.getElementById('page_number').getElementsByClassName('clickPageNumber');
            for (let i = 0; i < page_number.length; i++) {
                if (i === current_page - 1) {
                    page_number[i].style.opacity = "1.0";
                } else {
                    page_number[i].style.opacity = "0.5";
                }
                // console.log(page_number)
            }
        };

        let checkButtonOpacity = () => {
            current_page === 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
            current_page === numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
        };

        let numPages = () => Math.ceil(lotsCatalog.length / records_per_page);

        let changePage = (page) => {
            const cardContainer = document.getElementById('card-container');

            if (page < 1) {
                page = 1;
            }
            if (page > (numPages() - 1)) {
                page = numPages();
            }

            cardContainer.innerHTML = "";

            for (let i = (page - 1) * records_per_page; i < (page * records_per_page) && i < lotsCatalog.length; i++) {
                cardContainer.innerHTML += lotTemplate(lotsCatalog[i]);
            }
            checkButtonOpacity();
            selectedPage();
        };

        let prevPage = () => {
            if (current_page > 1) {
                current_page--;
                changePage(current_page);
                pageNumbers(pageMove(+current_page, numPages()));
            }
        };

        let nextPage = () => {
            if (current_page < numPages()) {
                current_page++;
                changePage(current_page);
                pageNumbers(pageMove(+current_page, numPages()));
            }
        };

        let clickPage = () => {
            document.addEventListener('click', (e) => {
                if (e.target.nodeName === "SPAN" && e.target.classList.contains("clickPageNumber")) {
                    current_page = e.target.textContent;
                    console.log(typeof current_page);
                    changePage(current_page);
                    pageMove(+current_page);
                    pageNumbers(pageMove(+current_page, numPages()));
                }
            });
        };

        let pageMove = (start, num) => {
            let delta = 3,
                size = num,
                range = [],
                rangeWithDots = [],
                left = start - delta,
                right = start + delta + 1,
                l;
            console.log(start);
            for (let i = 1; i <= size; i++) {
                if (i === 1 || i === size || i >= left && i < right) {
                    range.push(i);
                }
            }
            for (let i of range) {
                if (l) {
                    if (i - l === 2) {
                        rangeWithDots.push(l + 1);
                    } else if (i - l !== 1) {
                        rangeWithDots.push('...');
                    }
                }
                rangeWithDots.push(i);
                l = i;
            }
            return rangeWithDots;
        };

        let pageNumbers = (arr) => {
            let pageNumber = document.getElementById('page_number');
            pageNumber.innerHTML = "";
            arr.map((el) => pageNumber.innerHTML += `<span class='clickPageNumber'>${el} </span>`)
            selectedPage()
        }
    }

    let pagination = new Pagination();
    pagination.init();
})();