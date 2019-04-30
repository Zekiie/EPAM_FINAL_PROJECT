import {LocalStorage} from "../modules/lotsCatalog";

export class SellPage {
    displaySellForm(cat) {
        const root = document.getElementById('root');
        const optionMain = (cat) => cat.map(el => `<option value="${el.main_ctg}">${el.main_ctg}</option>`).join('');
        const optionSub = (cat) => cat.map(el => el.sub_ctg.map(_ => `<option value="${_}">${_}</option>`)).join('');
        const today = new Date();
        const plusOneWeek = new Date();
              plusOneWeek.setDate(today.getDate()+7);
        const defaultEndDay = dateFormat(plusOneWeek);
        const dateMin = dateFormat(today);

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
            return year + "-" + month + "-" + day;
        }

        root.innerHTML = `
                 <section class="add-lots">
                
                    <form action="/" method="post" id="add-to-catalog" class="sell-section">
              
                        <div class="lot">
                            <div class="popup">
                                <span class="popuptext"
                                      id="myPopup-email">You have entered an invalid email address!</span>
                                <label for="email" class="lot_email">Email
                                    <span class="req-color">*</span>
                                </label>
                                <input type="email" id="email" required>
                            </div>

                            <div class="popup">
                                <span class="popuptext" id="myPopup-title">You haven't entered a title!</span>
                                <label for="title" class="lot_title">Title
                                    <span class="req-color">*</span>
                                </label>
                                <input type="text" id="title" required>
                            </div>

                            <div class="popup">
                               
                                <label for="main_ctg" class="lot_category">Category
                                    <span class="req-color">*</span>
                                </label>
                              
                                <select id="main_ctg">
                                    ${optionMain(cat)}
                                </select>
                            </div>

                            <div class="popup">
                                
                                <label for="sub_ctg" class="lot_subcategory">Sub-category
                                    <span class="req-color">*</span>
                                </label>
                                
                                <select id="sub_ctg">
                                    ${optionSub(cat)}
                                </select>
                            </div>

                        </div>
                        <div class="no-required-field">
                            <label for="condition" class="condition">Condition</label>                          
                            <select id="condition">
                                <option value="New">New</option>
                                <option value="Used" selected>Used</option>
                                <option value="Old">Old</option>
                            </select>

                            <label for="start_price" class="lot_price">Price</label>
                            <input type="number" id="start_price" class="no-required-field_input" min="1" value="1">
                            <div>
                                <label for="end_date">End day</label>
                                <input type="date" id="end_date" class="lot_date" value="${defaultEndDay}"
                                       min="${dateMin}">
                                <label for="end_time">Till</label>
                                <input type="time" id="end_time" class="lot_time" value="09:00">
                            </div>

                        </div>

                        <div class="photo">
                            <span>Photo</span>
                            <label for="primary_url" class="photo_label">
                            <img src="app/img/default.png" alt="" id="image-view-1" class="image-view">
                            </label>
                            <input type="file" name="img" accept="image/*" id="primary_url" class="photo_input">
                            <label for="extra_url-1" class="photo_label"> 
                            <img src="app/img/default.png" alt="" id="image-view-2" class="image-view">
                            </label>
                            <input type="file" name="img" accept="image/*" id="extra_url-1" class="photo_input">
                            <label for="extra_url-2" class="photo_label"> 
                            <img src="app/img/default.png" alt="" id="image-view-3" class="image-view">
                            </label>
                            <input type="file" name="img" accept="image/*" id="extra_url-2" class="photo_input">
                            <label for="extra_url-3" class="photo_label"> 
                            <img src="app/img/default.png" alt="" id="image-view-3" class="image-view">
                            </label>
                            <input type="file" name="img" accept="image/*" id="extra_url-3" class="photo_input">
                            <p class="photo_info"><span class="lnr lnr-star"></span> Your first image will appear in
                                search results!</p>
                        </div>
                        <div class="lot_descript">
                            <label for="description">Description</label>
                            <textarea name="description" id="description"></textarea>
                        </div>

                        <label for="submit"></label>
                        <button type="submit" id="submit"  class="lot_submit">Submit</button>
                    </form>
                    <article class="form-details">
                        <p>* Required fields to fill</p>
                        <p>If the price don't set up, it'll be $1 by default.</p>
                        <p>If the date don't set up, the auction duration will be 7 days.</p>
                    </article>
                </section>
                
                 <div class="add-more-lots" id="popup-addMore">
                    <p class="add-more-lots_text">Would you like add more lots to sell?</p>
                    <button class="add-more-lots_btn" id='yes'>Yes</button>
                    <button class="add-more-lots_btn" id='no'>No</button>
                 </div>
                
                `
    }


}
