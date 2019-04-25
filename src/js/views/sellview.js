import {LocalStorage} from "../modules/lotsCatalog";

export class SellPage {
    displaySellForm(cat) {
        const root = document.getElementById('root');
        const optionMain = (cat) => cat.map( el => `<option value="${el.main_ctg}">`).join('');
        const optionSub = (cat) => cat.map(el => el.sub_ctg.map( _ => `<option value="${_}">`)).flat(2).join('');

        console.log( optionMain(cat))
        root.innerHTML = `
                <section class="add-lots">
        <form action="/" method="post" id="add-to-catalog" class="sell-section">
            <div class="lot">
            <label for="email" class="lot_email">Email
                    <span class="req-color">*</span>
                </label>
                <input type="email" id="email" required>
                
                <label for="title" class="lot_title">Title
                    <span class="req-color">*</span>
                </label>
                <input type="text" id="title" required>

                <label for="main_ctg" class="lot_category">Category
                    <span class="req-color">*</span>
                </label>
                
                <input  id="main_ctg" list="category-input" required placeholder="Select a category...">
                <datalist id="category-input">
                 ${optionMain(cat)}
                </datalist>

                <label for="sub_ctg" class="lot_subcategory">Sub-category
                    <span class="req-color">*</span>
                </label>
                <input list="subcategory-input" id="sub_ctg" placeholder="Select a sub-category..." required>
                <datalist id="subcategory-input">
                ${optionSub(cat)}
                </datalist>
            </div>

            <div class="no-required-field">
                <label for="condition-input" class="condition">Condition</label>
                <input id="condition" list="condition-state" class="no-required-field_input">
                <datalist id="condition-state">
                    <option value="New"></option>
                    <option value="Used"></option>
                    <option value="Old"></option>
                </datalist>

                <label for="start_price" class="lot_price">Price</label>
                <input type="number" id="start_price" class="no-required-field_input">
                <div>
                <label for="end_date">End day</label>
                <input type="date" id="end_date" class="lot_date">
                <label for="end_time">Till</label>
                <input type="time" id="end_time" class="lot_time">
             </div>
              
            </div>

            <div class="photo">
            <span>Photo</span>
            <label for="primary_url" class="photo_label"></label>
            <input type="file" name="img" accept="image/*" id="primary_url" class="photo_input">
                <label for="extra_url-1" class="photo_label"></label>
                <input type="file" name="img" accept="image/*" id="extra_url-1" class="photo_input">
                <label for="extra_url-2" class="photo_label"></label>
                <input type="file" name="img" accept="image/*" id="extra_url-2" class="photo_input">
                <label for="extra_url-3" class="photo_label"></label>
                <input type="file" name="img" accept="image/*" id="extra_url-3" class="photo_input">
            <p class="photo_info"><span class="lnr lnr-star"></span> Your first image will appear in search results!</p>
            </div>
            <div class="lot_descript">
            <label for="description">Description</label>
            <textarea name="description" id="description"></textarea>
            </div>

            <label for="submit"></label>
            <input type="submit" id="submit" value="Submit" class="lot_submit">
        </form>
        <article class="form-details">
            <p>* Required fields to fill</p>
            <p>If the price don't set up, it'll be $1 by default.</p>
            <p>If the date don't set up, the auction duration will be 7 days.</p>
        </article>
    </section>
                `
    }

    addToCatalog() {
        const formData = [...document.getElementById('add-to-catalog')],
            submit = document.getElementById('submit'),
            lotsArr = JSON.parse(localStorage.getItem("lots")),
            allId = lotsArr.map(lot => lot.id),
            newId = Math.max(...allId) + 1,
            minBid = 1,
            obj = {lot_id: newId, minimum_bid_amount: minBid};


        // submit.addEventListener("click", function (event) {
        //
        // });
        submit.addEventListener('click', (event) => {
            event.preventDefault()
            addLot();
            console.log(obj);

        });

        function addLot() {

            formData.map(el => {
                obj[[el.id]] = el.value;
            });

        }
    }
}
