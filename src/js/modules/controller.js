import {LocalStorage, Lots} from "./lotsCatalog";
import {SellPage} from "../views/sellview";
import {UI} from "../views/uiLots";
import {Slider} from "./slider";
import {FullLotsInfo} from "../views/fullLotsView";
import {lotsCatalog} from "../json/lots";
import {MenuView} from "./menu";
import {Search} from "./search";

const ui = new UI(),
    lotsCatolog = new Lots(),
    slider = new Slider(),
    search = new Search();


window.addEventListener('load', () => {
    const menu = new MenuView();
    lotsCatolog.getMenu().then(cat => {
        console.log(cat);
        menu.renderMenu(cat);
        search.goSearch(cat)
    })
});

export class Controller {

    async mainRoute() {
        await slider.showSlider();
        await ui.createLotsSection();
        lotsCatolog.getLots().then(lots => {
            ui.displayLots(lots, 6);
            LocalStorage.saveLots(lots);
        })

}
    async sellRoute() {
        slider.hideSlider();
        const sellPage = new SellPage();
        await lotsCatolog.getMenu().then(cat => {
            sellPage.displaySellForm(cat);
        });

        sellPage.addToCatalog();

    }

    async infoRoute(params) {
        let id = +params.id;
        slider.hideSlider();
        const fullLotsInfo = new FullLotsInfo();
        lotsCatolog.getLots().then(lots => {
                let lot = lots.find(lot => lot.id === id);
                fullLotsInfo.fullCardTemplate(lot);
                fullLotsInfo.timer();
                fullLotsInfo.imageGallery();
            }
        );
    }
}

