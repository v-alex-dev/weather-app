class BtnComponents {
    private  id: string | undefined;
    private btnType: "button" | "submit" | "reset" | undefined;
    private className: string |undefined;

    constructor(id?:string, btnType?:"button" | "submit" | "reset", className?:string) {
        this.id = id;
        this.btnType = btnType;
        this.className = className;
    }

    initButton(): HTMLButtonElement{
        const button = document.createElement('button');
        if (this.id) button.id = this.id;
        if (this.btnType) button.type = this.btnType;
        if (this.className) button.className = this.className;

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