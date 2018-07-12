import { html } from "hybrids";
import { flexbox } from "../../../src";

export default {
  params: {},
  render: () => html`
    <ui-top-bar>
      <ui-link 
        slot="actions-left"
        route="root"
        backwards
        icon="navigation arrow_back">
      </ui-link>
      Settings
    </ui-top-bar>

    <ui-content>
      <ui-link route="deep">Go to deep</ui-link>
    </ui-content>

    <app-switch flex-grow>
      <app-route name="settings-profile" path="/profile" component="profile-view"></app-route>
      <app-route name="settings-home" path="/" component="home-view"></app-route>

      <nav flex-box="row" flex-layout="space-around center">
        <ui-link route="settings-home" icon="action home"></ui-link>
        <ui-link route="settings-profile" icon="social person"></ui-link>
      </nav>
    </app-switch>

    ${flexbox}
  `,
};
