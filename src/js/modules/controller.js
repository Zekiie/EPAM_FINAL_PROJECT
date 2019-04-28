import {LocalStorage, Lots} from "./lotsCatalog";
import {SellPage} from "../views/sellview";
import {UI} from "../views/uiLots";
import {Slider} from "./slider";
import {FullLotsInfo} from "../views/fullLotsView";
import {lotsCatalog} from "../json/lots";
import {MenuView} from "./menu";
import {Search} from "./search";
import {Pagination} from "./pagination-v2";
import {AddNewLots} from "./addNewLotstoLS";

const ui = new UI(),
    lotsCatolog = new Lots(),
    slider = new Slider(),
    search = new Search(),
    pagination = new Pagination();


let fullLots = JSON.parse(localStorage.getItem('lots'));


window.addEventListener('load', () => {
    const menu = new MenuView();
    lotsCatolog.getMenu().then(cat => {
        console.log(cat);
        menu.renderMenu(cat);
        search.goSearch(cat)
    });
});

export class Controller {

    async mainRoute(params) {
        await ui.createLotsSection();
        pagination.getPagination(fullLots, ui.displayLots, 6);
        slider.showSlider();

}
    async sellRoute() {
        slider.hideSlider();
        const sellPage = new SellPage();
        const addNewLots = new AddNewLots();
        await lotsCatolog.getMenu().then(cat => {
            sellPage.displaySellForm(cat);
            addNewLots.addToCatalog();
        });




    }

    async infoRoute(params) {
        let id = +params.id;
        slider.hideSlider();
        const fullLotsInfo = new FullLotsInfo();

                let lot = fullLots.find(lot => lot.lot_id === id);
                fullLotsInfo.fullCardTemplate(lot);
                fullLotsInfo.timer(lot);
                fullLotsInfo.imageGallery();
            }


}

