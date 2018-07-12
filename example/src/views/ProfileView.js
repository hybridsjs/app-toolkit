import { html } from "hybrids";
import { flexbox } from "../../../src";

export default {
  params: {},
  render: () => html`
    <ui-top-bar>Profile</ui-top-bar>
    <ui-content>This is profile view</ui-content>

    ${flexbox}
  `,
};
