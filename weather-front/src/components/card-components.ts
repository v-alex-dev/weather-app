export class CardComponents {
    private header: HTMLElement | undefined;
    private body: HTMLElement | undefined;
    private footer: HTMLElement | undefined;

    constructor() {
        this.header = undefined;
        this.body = undefined;
        this.footer = undefined;
    }

    initArticle(): HTMLElement {
        const article = document.createElement('article');

        if (this.header) article.appendChild(this.header);
        if (this.body) article.appendChild(this.body);
        if (this.footer) article.appendChild(this.footer);

        return article;
    }

     private addHeader(): void {
        this.header = document.createElement('div');
        this.header.className = 'card-header';
    }

    private addBody(): void {
        this.body = document.createElement('div');
        this.body.className = 'card-body';
    }

     private addFooter(): void {
        this.footer = document.createElement('div');
        this.footer.className = 'card-footer';
    }

    addDiv(nbr :2 | 3): void {
        if (nbr > 2 ){
            this.addHeader()
            this.addBody()
            this.addFooter()
        }else{
            this.addBody();
            this.addFooter();
        }
    }
}