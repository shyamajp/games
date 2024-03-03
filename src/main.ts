import "./style.css";
import { handleClick } from ".";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Old Maid</h1>
    <button id="button">Start</button>
    <div id="board"></div>
  </div>
`;

handleClick(
  document.querySelector<HTMLButtonElement>("#button")!,
  document.querySelector<HTMLDivElement>("#board")!
);
