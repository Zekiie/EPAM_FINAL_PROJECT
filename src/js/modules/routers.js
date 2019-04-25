import {Controller} from './controller';

function getRouterInfo() {
    const hash = location.hash ? location.hash.slice(1) : '';
    const [name, id] = hash.split('/');

    return { name, params: {id}}
}

function handleHash() {
    const { name, params } = getRouterInfo();
    let controller = new Controller();
    if (name) {
        const routerName = name + 'Route';
        controller[routerName](params);
    } else if (name === '') {
        controller.mainRoute(params);

    }
}

export class Router {
    init() {
        addEventListener('hashchange', handleHash);
        handleHash();

    }
}

