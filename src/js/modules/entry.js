import {Router} from './routers';



(async () => {
    try {
        let router = new Router;
        router.init();

    } catch (e) {
        console.error(e);
        alert("Error" + e.message)
    }
})();