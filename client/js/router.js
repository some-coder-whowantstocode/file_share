import { routes } from "./routes.js";
import './upload.js'
import nav from './navbar.js'

const root = document.querySelector('#root');

class Router {
    constructor(routes){
        this.routes = routes;
    }



    Render(route){
        root.innerHTML = '';
        root.innerHTML = `
        ${nav}
        ${route}
        `;
    }

    changePage(){
        const route = this.routes.get(window.location.pathname);
        if(route){
            this.Render(route);
            return;
        }
        this.Render(this.routes['/notfound']);
    }

}

const router = new Router(routes);


window.addEventListener('customChangePage',()=>{
    router.changePage()
})
router.changePage()