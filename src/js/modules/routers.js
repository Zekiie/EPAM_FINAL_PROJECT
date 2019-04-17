import {Controller} from './controller';

function getRouterInfo() {
    const hash = location.hash ? location.hash.slice(1) : '';
    const [name, id] = hash.split('/');
    return { name, params: {id}}
}

function handleHash() {
    const { name } = getRouterInfo();
    let controller = new Controller();
    console.log(location.hash);
    console.log(name);
    if (name) {
        const routerName = name + 'Route';
        controller[routerName]();
    } else if (name === '') {

        controller.mainRoute();
    }
}

export class Router {
    init() {
        addEventListener('hashchange', handleHash);
        handleHash();

    }
}

