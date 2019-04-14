
export class SellPage {
    displaySellForm () {
        const sellBtn = document.querySelectorAll(".sell"),
              root = document.getElementById('root');
        sellBtn.forEach(el => {
            el.addEventListener('click', () => {
                root.innerHTML = `
                <section class="add-lots">
        <form action="" method="post" id="add-to-catalog" class="sell-section">
            <div class="lot">
                <label for="title-input" class="lot_title">Title
                    <span class="req-color">*</span>
                </label>
                <input type="text" id="title-input" required>

                <label for="category" class="lot_category">Category
                    <span class="req-color">*</span>
                </label>
                <input id="category" list="category-input" required value="Select a category...">
                <datalist id="category-input"></datalist>

                <label for="subcategory" class="lot_subcategory">Sub-category
                    <span class="req-color">*</span>
                </label>
                <input list="category-input" id="subcategory" value="Select a sub-category..." required>
                <datalist id="subcategory-input"></datalist>
            </div>

            <div class="no-required-field">
                <label for="condition-input" class="lot_condition">Condition</label>
                <input id="condition-input" list="condition-state" class="no-required-field_input">
                <datalist id="condition-state">
                    <option value="New"></option>
                    <option value="Used"></option>
                    <option value="Old"></option>
                </datalist>

                <label for="price-input" class="lot_price">Price</label>
                <input type="number" id="price-input" class="no-required-field_input">
                <label for="date-input">End accept bid</label>
                <input type="date" id="date-input" class="lot_date">
            </div>

            <div class="photo">
            <span>Photo</span>
            <label for="photo{$i}" class="photo_label"></label>
            <input type="file" name="img" accept="image/*" id="photo{$i}" class="photo_input">
                <label for="photo{$i}" class="photo_label"></label>
                <input type="file" name="img" accept="image/*" id="photo{$i}" class="photo_input">
                <label for="photo{$i}" class="photo_label"></label>
                <input type="file" name="img" accept="image/*" id="photo{$i}" class="photo_input">
                <label for="photo{$i}" class="photo_label"></label>
                <input type="file" name="img" accept="image/*" id="photo{$i}" class="photo_input">
            <p class="photo_info"><span class="lnr lnr-star"></span> Your first image will appear in search results!</p>
            </div>
            <div class="lot_descript">
            <label for="text-descr">Description</label>
            <textarea name="description" id="text-descr"></textarea>
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
            })
        })
    }

}
// const sellPage = new SellPage();
//         sellPage.displaySellForm();