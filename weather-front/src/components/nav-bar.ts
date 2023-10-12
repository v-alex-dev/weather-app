import { resetLastSearch } from "../functions/localStorages-utils";
import { BtnComponents } from "./btn-components";

export const navBar = () => {
  const nav:HTMLElement = document.createElement('nav');
  const title:HTMLElement = document.createElement('h1');
  const icon:HTMLImageElement= document.createElement('img');

  const newBtn = new BtnComponents('reset-localStorage', 'button');
  const btnReset = newBtn.initButton();
  title.textContent = 'weather-app';
  icon.src = '../../public/vite.svg';

  nav.appendChild(icon);
  nav.appendChild(title)
  nav.appendChild(btnReset);
  
  nav.classList.add('flex', 'justify-between', 'w-full', 'h-10')
  btnReset.classList.add('border-2', 'p-2', 'rounded-full', 'hover:bg-cyan-500','hover:ease-in','duration-300','align-center')
  btnReset.textContent = 'reset local storage';

  btnReset.addEventListener('click', resetLastSearch);
  ;

  return nav

}