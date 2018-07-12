/* eslint-disable import/no-unresolved, import/extensions */
import "hybrids/shim";

import { define, html } from "hybrids";
import { AppStack, AppRoute } from "../../src";

import views from "./views/*.js";
import components from "./components/*.js";

function mapDefaultExports(modules) {
  return Object.keys(modules).reduce((acc, key) => {
    acc[key] = modules[key].default;
    return acc;
  }, {});
}

define("app-example", {
  render: () =>
    html`
      <app-stack>
        <app-route name="root" path="/" component="root-view" default></app-route>
        <app-route name="settings" path="/settings" component="settings-view"></app-route>
        <app-route name="deep" path="/deep" component="deep-view"></app-route>
      </app-stack>

      <style>
        :host { 
          font-family: Roboto, sans-serif;
        }
      </style>
    `.define({
      AppStack,
      AppRoute,

      // App web components
      ...mapDefaultExports(views),
      ...mapDefaultExports(components),
    }),
});
