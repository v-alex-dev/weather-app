import {mainSection} from "./pages/main.ts";

const body = document.body;
const main = document.createElement('main');
const section = mainSection();


body.appendChild(main);
main.appendChild(section);


