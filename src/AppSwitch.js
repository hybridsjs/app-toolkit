import { html } from "hybrids";
import AppRouter from "./AppRouter";
import { flexbox, renderElement } from "./utils";

export default {
  ...AppRouter,
  unmount: false,

  switchMap: ({ state }, lastMap = {}) => ({
    ...lastMap,
    [state.name]: state,
  }),
  switchList: ({ switchMap, unmount, state: currentState, getRoute }) =>
    Object.values(switchMap)
      .filter(state => (unmount ? state.route === currentState.route : true))
      .map(state =>
        renderElement(getRoute(state.name).component, {
          params: state.params,
          hidden: state.name !== currentState.name,
          "flex-grow": true,
        }),
      ),

  render: ({ switchList }) => html`
    ${switchList}

    <div flex-box>
      <slot></slot>
    </div>

    ${flexbox}
  `,
};
