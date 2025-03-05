class FileList extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode:"closed"});
        this.shadow.innerHTML = `
        <div
        id="list"
        ></div>
        `
        this.initiliaze();
    }

    async initiliaze(){
        const list = this.shadow.getElementById("list");
        const response = await fetch("/API/listfile");
        const reader = response.body.getReader();
            const { value } = await reader.read();
            const decoder = new TextDecoder();
            const text = decoder.decode(value);
            const jsontext = JSON.parse(text)
            jsontext.files.map((name)=>{
                const p = document.createElement('p');
                p.innerText = name;
                list.appendChild(p)
            })
            console.log(jsontext)
    }
}

customElements.define("list-page", FileList);