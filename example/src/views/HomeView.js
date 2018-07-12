import { html } from "hybrids";
import { flexbox } from "../../../src";

export default {
  params: {},
  render: () => html`
    <ui-top-bar>Home</ui-top-bar>
    <app-box layout="row" wrap overflow>
      <ui-content>
        This is home view
      </ui-content>
      <ui-content>
        <input value="default" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSax2qY1_ypAJfPiJJGXoGCTKR4JjOEKld_hEWcoZccXqGgYMXt" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSax2qY1_ypAJfPiJJGXoGCTKR4JjOEKld_hEWcoZccXqGgYMXt" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSax2qY1_ypAJfPiJJGXoGCTKR4JjOEKld_hEWcoZccXqGgYMXt" />
      </ui-content>
    </app-box>

    ${flexbox}
    <style>
      .content { height: 300px; }
    </style>
  `,
};
