import { html } from "hybrids";

export default {
  render: () => html`
    <ui-top-bar>
      <ui-link 
        slot="actions-left"
        route="root"
        backwards
        icon="navigation arrow_back">
      </ui-link>
      Deep
    </ui-top-bar>
  `,
};
