import {LocalStorage, Lots} from "./lotsCatalog";
import {SellPage} from "../views/sellview";
import {UI} from "../views/uiLots";


export class Controller {
    async mainRoute() {
        const ui = new UI(),
            lotsCatolog = new Lots();
        ui.createLotsSection ();
        lotsCatolog.getLots().then(lots =>  {
            ui.displayLots(lots, 6);
            LocalStorage.saveLots(lots);
            // const sellPage = new SellPage();
            // sellPage.displaySellForm();
        });
    }
    async sellRoute () {
        const sellPage = new SellPage();
        sellPage.displaySellForm();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    //two instance for class, no need storage instance, because there will be only static methods
    // let controller = new Controller();
    // controller.mainRoute();
    // const ui = new UI(),
    //     lotsCatolog = new Lots(),
    //     storage = new LocalStorage();
    // ui.createLotsSection ();
    //get all lots
//     lotsCatolog.getLots().then(lots =>  {
//         ui.displayLots(lots, 6);
//         LocalStorage.saveLots(lots);
//         // const sellPage = new SellPage();
//         // sellPage.displaySellForm();
//     }).then(() => {
//         ui.addLots();
//         ui.getBagButtons();
//     });
//
});