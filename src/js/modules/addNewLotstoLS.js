import {CartStorage} from "./lotsCatalog";

export class AddNewLots {

    addToCatalog(cat) {
        const id = (id) => document.getElementById(id);
        const formData = [...id('add-to-catalog')];
        const submit = id('submit');
        const allInputs = [...document.querySelectorAll(" form input")];
        const obj = {};
        const email = id('email');
        const title = id('title');
        const disableAllinput = () => allInputs.forEach(input => input.disabled = true);
        const ableAllinput = () => allInputs.forEach(input => input.disabled = false);
        const images = document.querySelectorAll(".photo_input");
        const imgTag = [...document.querySelectorAll('.image-view')];
        const arrImg = [];
        const catOption = document.getElementById('main_ctg');
        const subOption = document.getElementById('sub_ctg');
        const storage = new CartStorage();

        // allInputs.forEach( input => input.addEventListener('keypress', () =>  submit.disabled = true));

        function validateEmail(mail, popup) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail) && mail !== '') {
                popup.classList.remove("show");
                return true
            } else {
                popup.classList.add("show");
            }
        }

        function validateTitle(input, popup) {
            if (input === "") {
                popup.classList.add("show");
            } else {
                popup.classList.remove("show");
                submit.disabled = true
            }
        }

        function selectInput(select) {
            const sub = cat.find(el => el.main_ctg === select.value);
            const optionSub = () => sub.sub_ctg.map(_ => `<option value="${_}">${_}</option>`).join('');
            subOption.innerHTML = optionSub();
        }

        function imgByDefault(arr) {
            if (arr.every(el => el.files === '')) {
                arr[0].primary_url = 'app/img/auction-icon.png'
            }
        }

        function addMorePopup() {
            id("popup-addMore").style.visibility = 'visible';
            disableAllinput();

            id('yes').addEventListener("click", () => {
                submit.disabled = false;
                id("popup-addMore").style.visibility = 'hidden';
                ableAllinput();
                console.log(title)
            });
            id('no').addEventListener("click", () => location.hash = "#");
            submit.disabled = true;

        }

        function createObj() {
            const lotsArr = JSON.parse(localStorage.getItem("lots")),
                allId = lotsArr.map(lot => lot.lot_id),
                minBid = 1;
            obj.images = arrImg;
            obj.status = "auction";
            obj.lot_id = Math.max(...allId) + 1;
            obj.minimum_bid_amount = minBid;
            formData.map(el => {
                obj[[el.id]] = el.value;
            });
        }

        function addLot(lot) {
            let fullCatalog = JSON.parse(localStorage.getItem("lots"));
            fullCatalog.push(lot);
            localStorage.setItem("lots", JSON.stringify(fullCatalog));
        }

        email.addEventListener('change', () => validateEmail(email.value, id("myPopup-email")));
        // title.addEventListener('change', (e) => validateTitle(e.target.value, id("myPopup-title")));
        catOption.addEventListener('change', () => selectInput(catOption));


        submit.addEventListener('click', (event) => {
            event.preventDefault();
            if (validateEmail(email.value, id("myPopup-email"))) {
                createObj();
                addMorePopup();
                addLot(obj);
            }
        });


        [...images].map((img, i) => {
            let path;

            img.addEventListener('change', (e) => {
                if (e.target.files[0]) {
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                        imgTag[i].src = reader.result;
                    });
                    path = `app/img/goods/${e.target.value.match(/[^\\]*\.(\w+)/gm).join('')}`;
                    obj.image = `app/img/goods/${e.target.value.match(/[^\\]*\.(\w+)/gm).join('')}`;
                    arrImg.push(path);
                    reader.readAsDataURL(e.target.files[0]);
                }
            })
        });
    }

}
