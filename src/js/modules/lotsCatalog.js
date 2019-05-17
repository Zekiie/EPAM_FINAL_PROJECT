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
            let result = await fetch("app/js/json/lots.json"); //settle the request
            let data = await result.json();
            let lots = data.products;
            lots = lots.map( el => {
                const lot_id = el.lot_id;
                const email = el.email;
                const {title,description,start_price,end_date,end_time, status, minimum_bid_amount, condition, price} = el.lot_info;
                const {main_ctg, sub_ctg} = el.lot_info.category;
                const image = el.lot_info.images.primary_url;
                const images = el.lot_info.images.extra_url;
                return {lot_id,email,title,description,start_price, price, end_date,end_time,status, minimum_bid_amount, condition, main_ctg, sub_ctg, image, images}
            });
            localStorage.setItem("lots", JSON.stringify(lots));
            return lots;

        } catch (error) {
            console.log(error);
        }
    }
    async addBids(obj) {
        const bidBtn = document.querySelectorAll(".bid-btn");
        const bidInput = document.querySelectorAll(".bid-input");
        const lots = obj;

        let bid = 0;
        if (bid !== 0) {
            bid = 0;
        }
        bidInput.forEach( input => {
            input.addEventListener('change', () => {
                if (+input.value < 0) {
                    bid = 0.01;
                }
                bid += +input.value;
            })
        });
        //bid for multiply buttons
        bidBtn.forEach( btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                const user = JSON.parse(localStorage.getItem('user'));
                if (user) {
                    const lot = lots.find(el => el.lot_id === +id);
                    lot.price = +lot.price + bid;
                    lot.email_bid = user.email;
                    localStorage.setItem('lots', JSON.stringify(lots));
                    document.location.reload(true);
                } else {
                    const signup = document.querySelector(".signup-classic");
                    document.getElementById("close-signup").addEventListener('click', () => signup.style.display = 'none');
                    signup.style.display = 'block';

                }

            })
        });
    }

}
//local storage
export class CartStorage {

    getLots(id) {
        let lots = JSON.parse(localStorage.getItem("lots"));
        return lots.find(item => item.lot_id === id)
    }
    saveCart (cart) {
        localStorage.setItem("cart", JSON.stringify(cart))
    }
    refreshLots (lots) {
        localStorage.setItem("lots", JSON.stringify(lots))
    }
}