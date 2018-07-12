import { html } from "hybrids";
import { flexbox } from "../../../src";

export default {
  render: () => html`
    <slot></slot>

    ${flexbox}
    <style>
      :host { padding: 16px; }
    </style>
  `,
};
