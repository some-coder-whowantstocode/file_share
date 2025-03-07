class FileList extends HTMLElement {
    constructor(){
        super();
        this.shadow = this.attachShadow({mode:"closed"});
        this.shadow.innerHTML = `
        <style>
        .bhai_link{
            color:blue;
            cursor:pointer;
        }
        .bhai_link:hover{
            text-decoration:underline;
        }
        </style>
        <div
        id="list"
        ></div>
        `
        this.initiliaze();
    }

    async initiliaze(){
        const list = this.shadow.getElementById("list");
        const response = await fetch("/API/listfile");
        const downloadfile = async(filename)=>{
            const response = await fetch(`/API/downloadFile?filename=${filename}`);
            const blob = await response.blob(); 
            const url = window.URL.createObjectURL(blob);
            console.log(url)
    
            const a = document.createElement('a');
            a.href = url;
            a.download = filename; 
            document.body.appendChild(a);
            a.click();
            a.remove();
    
            console.log('File downloaded successfully!');
        }
        const reader = response.body.getReader();
            const { value } = await reader.read();
            const decoder = new TextDecoder();
            const text = decoder.decode(value);
            const jsontext = JSON.parse(text)
            jsontext.files.map((name)=>{
                const p = document.createElement('p');
                p.classList.add("bhai_link");
                p.innerText = name;
                p.onclick =()=>{downloadfile(name)};
                list.appendChild(p)
            })
            console.log(jsontext)
    }
}

customElements.define("list-page", FileList);