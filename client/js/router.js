import { routes } from "./routes.js";
import './upload.js'

const root = document.querySelector('#root');

class Router {
    constructor(routes){
        this.routes = routes;
    }



    Render(route){
        console.log(root)
        root.innerHTML = '';
        root.innerHTML = `${route}`;
    }

    changePage(){
        const route = this.routes.get(window.location.pathname);
        console.log(route,this.routes.get(window.location.pathname))
        if(route){
            this.Render(route);
            return;
        }
        // this.Render(this.routes['/notfound']);
    }

}

const router = new Router(routes);

window.addEventListener('popstate',()=>{
    router.changePage()
})
router.changePage()