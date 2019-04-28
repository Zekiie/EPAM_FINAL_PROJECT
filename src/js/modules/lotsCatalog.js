//card localstorage


//getting lots
export class Lots {
    async getMenu() {
        try {
            let result = await fetch("app/js/json/lots.json"), //settle the request
                data = await result.json();
            let menu = data.categories;
            menu = menu.map(el => {
                const {main_ctg, sub_ctg} = el;
                return {main_ctg, sub_ctg}
            });
            return menu
        }catch (error) {
            alert("Something goes Wrong!");
        }

    }
    async getLots() {
        try {
            //async always return a Promise, await => till Promise is settle ant then return the result //ajax request
            let result = await fetch("app/js/json/lots.json"), //settle the request
                data = await result.json();
            console.log()
            let lots = data.products;
            lots = lots.map( el => {
                const lot_id = el.lot_id;
                const {email,title,description,start_price,end_date,end_time,minimum_bid_amount, condition} = el.lot_info;
                const {main_ctg, sub_ctg} = el.lot_info.category;
                const image = el.lot_info.images.primary_url;
                const images = el.lot_info.images.extra_url;
                return {lot_id,email,title,description,start_price,end_date,end_time,minimum_bid_amount, condition, main_ctg, sub_ctg, image, images}
            });
            localStorage.setItem("lots", JSON.stringify(lots));
            return lots;

        } catch (error) {
            console.log(error);
        }
    }


}


//display lots/manipulate with lots
// class UI {
//     displayLots(lots) {
//         let result = '';
//         lots.forEach ( lots => {
//            result +=  `
//                 <article class="card" data-id="${lots.lot_id}">
//                 <img src="${lots.image}" alt="${lots.title}" class="card_img">
//                 <div class="card_details">
//                     <h2>${lots.title}</h2>
//                     <p>$${lots.start_price}</p>
//                     <div id="description" class="description">
//                        ${lots.description}
//                     </div>
//                 </div>
//                 <div class="card_btn">
//                     <label for="bid"></label>
//                     <input id="bid" type="number" class="bid-input">
//                     <input type="button" id="addBid" value="Bid" class="bid-btn">
//                     <label for="info" class="info-label"></label>
//                     <input type="button" id="info" value="More details" class="info-btn">
//                 </div>
//             </article>
// `
//         });
//         cardContainer.innerHTML = result;
//
//     }
// }

//local storage
export class LocalStorage {
//static method could be without extantion the class
    static saveLots (lots) {
        localStorage.setItem("lots", JSON.stringify(lots));

    }
}
// lotsCatolog.getLots().then(lots => {
//     console.log(params.id)
//     LocalStorage.saveLots(lots);
// })
// document.addEventListener('DOMContentLoaded', () => {
//     //two instance for class, no need storage instance, because there will be only static methods
//     const ui = new UI(),
//           lotsCatolog = new Lots();
//
//     //get all lots
//     lotsCatolog.getLots().then(lots => ui.displayLots(lots))
// });