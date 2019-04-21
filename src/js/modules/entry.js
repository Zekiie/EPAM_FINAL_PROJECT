import {Router} from './routers';
import {MenuView} from "./menu";



(async () => {
    try {
        let router = new Router;
        router.init();

    } catch (e) {
        console.error(e);
        alert("Something Goes Crazy!")
    }
})();