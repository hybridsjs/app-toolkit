import { html } from "hybrids";
import { AppSwitch, flexbox } from "../../../src";

export default {
  params: {},
  render: () =>
    html`
      <app-switch flex-grow>
        <app-route name="home" path="/" component="home-view"></app-route>
        <app-route name="profile" path="/profile" component="profile-view"></app-route>

        <nav flex-box="row" flex-layout="space-around center">
          <ui-link route="home" icon="action home"></ui-link>
          <ui-link route="profile" icon="social person"></ui-link>
          <ui-link route="settings" icon="action settings"></ui-link>
        </nav>
      </app-switch>

      ${flexbox}
      <style>
        nav {
          height: 50px;
          background: #CCC;
        }
        nav ui-link {
          --ui-link-active-color: #0085e4;
          --ui-icon-fill: #666;
        }
      </style>
    `.define({ AppSwitch }),
};
