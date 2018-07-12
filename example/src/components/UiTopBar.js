import { html } from "hybrids";
import { flexbox } from "../../../src";

export default {
  render: () => html`
    <div flex-box="row" flex-layout="center" flex-grow>
      <div class="actions" flex-box="row" flex-layout="start center">
        <slot name="actions-left"></slot>
      </div>
      <div class="title" flex-box="row" flex-layout="center" flex-grow>
        <slot></slot>
      </div>
      <div class="actions" flex-box="row" flex-layout="end center">
        <slot name="actions-right"></slot>
      </div>
    </div>
    
    ${flexbox}
    <style>
      :host {
        height: 44px;
        border-bottom: 1px solid var(--ui-top-bar-border-color, #ddd);
        --ui-icon-fill: black;
      }
      .actions {
        padding: 0 16px;
        width: 60px;
      }
      .title {
        padding: 0 16px;
      }
    </style>
  `,
};
