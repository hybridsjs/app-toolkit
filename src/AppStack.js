import { html } from "hybrids";
import AppRouter from "./AppRouter";

import { renderElement } from "./utils";

export default {
  ...AppRouter,

  transition: "slide-right",

  stackMap: ({ state }, stack = {}) => ({ ...stack, [state.id]: state }),
  stackList: ({ stackMap, state, getRoute, transition }) => {
    const list = Object.keys(stackMap);
    if (list.length > state.id + 1) {
      list.length = state.id + 2;
    }

    const backwards = state.id + 1 < list.length;
    const stackList = list.map(id => {
      const { name, params } = stackMap[id];
      const route = getRoute(name);
      return {
        id,
        backwards,
        active: String(state.id) === id,
        content: renderElement(route.component, { params }),
        transition: route.transition || transition,
      };
    });

    return stackList;
  },

  render: ({ stackList }) =>
    html`
      ${stackList.map(({ id, backwards, active, content, transition }) =>
        html`
          <app-screen
            active="${active}"
            backwards="${backwards}"
            transition="${transition}"
            content="${content}"
          ></app-screen>
        `.key(id),
      )}
    
      <style>
        :host {
          display: block;
          position: fixed;
          background: black;
        }
        :host([hidden]) { display: none }

        :host, app-screen {
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        app-screen { position: absolute; }
      </style>
    `,
};
