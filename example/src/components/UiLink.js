import { html } from "hybrids";
import { AppLink, flexbox } from "../../../src";

export default {
  ...AppLink,
  icon: "",

  render: ({ href, navigate, icon, active }) => html`
    <a
      flex-box="row"
      flex-layout="center"
      flex-grow
      href="${href}"
      onclick="${navigate}"
      class="${{ active }}"
    >
      ${icon && html`<ui-icon name="${icon}"></ui-icon>`}
      <slot></slot>
    </a>
  
    ${flexbox}
    <style>
      a {
        -webkit-tap-highlight-color: transparent;
        text-decoration: none;
        color: initial;
      }
      .active {
        --ui-icon-fill: var(--ui-link-active-color, blue);
      }
    </style>
  `,
};
