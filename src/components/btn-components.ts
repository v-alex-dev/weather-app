export class BtnComponents {
    private  id: string | undefined;
    private btnType: "button" | "submit" | "reset" | undefined;
    private className: string |undefined;
    private txt:string | undefined;
    constructor(id?:string, btnType?:"button" | "submit" | "reset", className?:string, txt?:string) {
        this.id = id;
        this.btnType = btnType;
        this.className = className;
        this.txt = txt
    }

    initButton(): HTMLButtonElement{
        const button = document.createElement('button');
        if (this.id) button.id = this.id;
        if (this.btnType) button.type = this.btnType;
        if (this.className) button.className = this.className;
        if (this.txt) button.textContent = this.txt;
        return button
    }

    initStyle(classList:[string]) : HTMLButtonElement {
        const button = this.initButton()

        if (classList && classList.length > 0) {
            button.classList.add(...classList);
        }

        return button;
    }
}