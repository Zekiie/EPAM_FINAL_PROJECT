import {LocalStorage, Lots} from "./lotsCatalog";
import {SellPage} from "../views/sellview";
import {UI} from "../views/uiLots";
import {Slider} from "./slider";
import {FullLotsInfo} from "../views/fullLotsView";
import {lotsCatalog} from "../json/lots";

const ui = new UI(),
    lotsCatolog = new Lots(),
    slider = new Slider();

export class Controller {
    async mainRoute() {
        slider.showSlider();
        await ui.createLotsSection();
        lotsCatolog.getLots().then(lots => {
            ui.displayLots(lots, 6);
            LocalStorage.saveLots(lots);
        })
        // const sellPage = new SellPage();
        // sellPage.displaySellForm();
    }

    async sellRoute() {
        const sellPage = new SellPage();
        sellPage.displaySellForm();
        await slider.hideSlider();
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

