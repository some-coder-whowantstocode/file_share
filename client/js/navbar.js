import { changePageEvent } from "./event.js";

class Navbar extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.innerHTML = `
        <style>
        .nav{
        display:flex;
        width:100dvw;
        }
        .nav div{
        display:flex;
        align-items:center;
        justify-content:center;
        }
        .logo{
        padding:1rem;
        }
        .location{
        flex:1;
        }
        .location p {
        padding:0.4rem 1rem;
        cursor:pointer;
        }
        </style>
        <div
        class="nav"
        >
            <div
            class="logo"
            >Logo</div>
            <div class="location">
                <p
                onclick="changeLocation('/')"
                >Home</p>
                <p
                onclick="changeLocation('/upload')"
                >Upload</p>
                <p
                onclick="changeLocation('list')"
                >Files</p>
            </div>

        </div>
        `
        this.initialize();
    }

    changeLocation(location){
        window.dispatchEvent(changePageEvent);
        history.pushState(null,null,location)
    }

    initialize(){
       
        window.changeLocation = this.changeLocation.bind(this)
    }
}

customElements.define('nav-element',Navbar);

const elem = `<nav-element></nav-element>`
export default elem;