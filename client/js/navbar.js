import { changePageEvent } from "./event.js";

class Navbar extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode:'closed'});
        this.shadow.innerHTML = `
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
                val="/"
                >Home</p>
                <p
                val="upload"
                >Upload</p>
                <p
                val="list"
                >Files</p>
            </div>

        </div>
        `
        this.initialize();
    }

    
    

    initialize(){
        const locations = this.shadow.querySelector(".location");
        function changeLocation(event){
            history.pushState(null,null,event.target.getAttribute("val"))
            window.dispatchEvent(changePageEvent);
        }
        Array.from(locations.children).map((child)=>{
            child.addEventListener("click",changeLocation)
        })
    }
}

customElements.define('nav-element',Navbar);

const elem = `<nav-element></nav-element>`
export default elem;