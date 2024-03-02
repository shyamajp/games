import "./style.css";
import { res } from ".";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Old Maid</h1>
    <ul>
      ${res.hands
        .map((hand) => {
          return `<li>${hand.name} - ${hand.cards}</li>`;
        })
        .join("")}
    </ul>
  </div>
`;
