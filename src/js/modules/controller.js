import {LocalStorage, Lots} from "./lotsCatalog";
import {SellPage} from "../views/sellview";
import {UI} from "../views/uiLots";
import {Slider} from "./slider";
import {FullLotsInfo} from "../views/fullLotsView";
import {MenuView} from "./menu";
import {Search} from "./search";
import {Pagination} from "./pagination-v2";
import {AddNewLots} from "./addNewLotstoLS";
import {AuctionCart} from "../views/auctionCart";
import {Timer} from "./timer";

const ui = new UI();
const lotsCatolog = new Lots();
const slider = new Slider();
const search = new Search();
const pagination = new Pagination();
const auctionCart = new AuctionCart();
const timer = new Timer();


let fullLots = JSON.parse(localStorage.getItem('lots'));
// lotsCatolog.getLots();

window.addEventListener('load', () => {
    const menu = new MenuView();
    lotsCatolog.getMenu().then(cat => {
        menu.renderMenu(cat);
        search.goSearch(cat);

    });
});

export class Controller {

    async mainRoute(params) {

        if(params.id === undefined || params.id === "page=1") {
            await ui.createLotsSection();
            slider.hideForSmallDev();
            await slider.showSlider();
            pagination.getPagination(fullLots, ui.displayLots, 6);
            lotsCatolog.addBids(fullLots);
            ui.checkForWinning();
        } else if (params.id) {
            lotsCatolog.addBids(fullLots);
            ui.checkForWinning();
        }

    }

    async sellRoute() {
        slider.hideSlider();
        const sellPage = new SellPage();
        const addNewLots = new AddNewLots();
        await lotsCatolog.getMenu().then(cat => {
            sellPage.displaySellForm(cat);
            addNewLots.addToCatalog(cat);
        });
    }

    async infoRoute(params) {
        let id = +params.id;
        slider.hideSlider();
        const fullLotsInfo = new FullLotsInfo();

        let lot = fullLots.find(lot => lot.lot_id === id);
        fullLotsInfo.fullCardTemplate(lot);
        timer.timer(lot);
        timer.imageGallery();
        fullLotsInfo.addBid(lot, fullLots);
        fullLotsInfo.checkTimer();
    }


}

