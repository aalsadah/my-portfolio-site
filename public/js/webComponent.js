class dadJoke extends HTMLElement{
    static observedAttributes=["endpoints"]
    constructor(){
        super();
        this.endpoint="https://icanhazdadjoke.com/";
    }
    connectedCallback(){
        this.render();
        this.button=this.querySelector("button")
        this.button.addEventListener("click", () => this.loadJoke());
		this.loadJoke();
    }
    render(){
        const template=document.getElementById("joke-template")
        const clone=template.content.cloneNode(true);
        this.innerHTML="";
        this.appendChild(clone);
    }
    async loadJoke(){
        const displayJoke=this.querySelector(".display-joke");
        displayJoke.textContent="";

        try{
            const apiResponse=await fetch(this.endpoint, {
                headers:{
                    "Accept":"application/json"
                }
            });
            const data= await apiResponse.json();
            displayJoke.textContent=data.joke;
        }
        catch(error){
            displayJoke.textContent="Oh no something went wrong!"
        }
    }
}
customElements.define("dad-joke", dadJoke);
