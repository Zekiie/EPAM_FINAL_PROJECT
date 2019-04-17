export class Pagination {

    getPagination(obj, ui, lotsPerPage) {
        const prevButton = document.getElementById('button_prev');
        const nextButton = document.getElementById('button_next');
        let current_page = 1;
        let records_per_page = lotsPerPage;

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
            }
        };

        let checkButtonOpacity = () => {
            current_page === 1 ? prevButton.classList.add('opacity') : prevButton.classList.remove('opacity');
            current_page === numPages() ? nextButton.classList.add('opacity') : nextButton.classList.remove('opacity');
        };

        let numPages = () => Math.ceil(obj.length / records_per_page);

        let changePage = (page, container) => {
            const cardContainer = document.getElementById('card-container');
            // const ui = new UI();
            if (page < 1) {
                page = 1;
            }
            if (page > (numPages() - 1)) {
                page = numPages();
            }

            cardContainer.innerHTML = '';

            for (let i = (page - 1) * records_per_page; i < (page * records_per_page) && i < obj.length; i++) {
                // cardContainer.innerHTML += lotTemplate(lotsCatalog[i]);
                cardContainer.innerHTML += ui(obj[i]);
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
        };
        changePage(1);
        pageNumbers(pageMove(+current_page, numPages()));
        selectedPage();
        clickPage();
        addEventListeners();

    }
}

