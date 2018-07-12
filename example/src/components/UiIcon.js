import { html } from "hybrids";
import { flexbox } from "../../../src";

function getIconURL(name) {
  const [group, id] = name.split(" ");
  return `https://raw.githubusercontent.com/google/material-design-icons/master/${group}/svg/production/ic_${id}_24px.svg`;
}

export default {
  name: "",
  icon: ({ name }) => fetch(getIconURL(name)).then(res => res.text()),
  render: ({ icon }) => html`
    ${html.resolve(
      icon.then(
        text => html`
          <div flex-box="row" flex-layout="center" flex-grow innerHTML="${text}"></div>
        `,
      ),
    )}
    ${flexbox}
    <style>
      :host {
        min-width: 24px;
        min-height: 24px;
      }

      path {
        fill: var(--ui-icon-fill, black);
      }
    </style>
  `,
};
