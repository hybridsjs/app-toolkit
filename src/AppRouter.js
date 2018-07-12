import { children, parent, dispatch } from "hybrids";
import AppRoute from "./AppRoute";

const AppRouter = {
  parentRouter: parent(
    hybrids => hybrids.parentRouter === AppRouter.parentRouter,
  ),
  parentState: ({ parentRouter }, lastValue) =>
    lastValue || (parentRouter && parentRouter.state),

  base: "",
  parentBase: ({ parentRouter }, lastValue) => {
    if (lastValue !== undefined) return lastValue;
    if (parentRouter) {
      const {
        getURL,
        state: { name, params },
      } = parentRouter;
      return getURL(name, params, true).replace(/\/$/, "");
    }
    return "";
  },
  resolvedBase: ({ base, parentBase }) => `${parentBase}${base}`,

  deep: ({ parentRouter }) => (parentRouter ? parentRouter.deep + 1 : 0),

  routesSource: children(AppRoute, { deep: true, nested: true }),
  routes: ({ routes }) => routes.slice().reverse(),

  state: {
    get: (
      { deep, resolvedBase, parentState, parentRouter, routes },
      lastState,
    ) => {
      if (
        parentState &&
        parentState.name !== parentRouter.state.name &&
        lastState
      ) {
        return lastState;
      }

      const history = window.history.state || [[]];
      const globalState = history[0];

      let state = globalState[deep];

      if (!state) {
        let pathname = window.location.pathname;
        pathname = resolvedBase
          ? pathname.replace(new RegExp(`^${resolvedBase}`), "/")
          : pathname;
        const search = window.location.search;

        const currentRoute =
          routes.find(({ isMatch }) => isMatch(pathname)) ||
          routes.find(route => route.default);
        if (!currentRoute) {
          throw new Error(
            "No route matched. Use 'default' option to set default route.",
          );
        }

        state = {
          id: 0,
          name: currentRoute.name,
          params: currentRoute.getParams(pathname, search),
        };

        globalState[deep] = state;
        window.history.replaceState(history, null);
      }

      return state;
    },
    connect: (host, key, invalidate) => {
      host.addEventListener("navigate", invalidate);
      window.addEventListener("popstate", invalidate);

      return () => {
        host.removeEventListener("navigate", invalidate);
        window.removeEventListener("popstate", invalidate);
      };
    },
  },

  navigate: host => (name, params = {}, options = {}) => {
    const { resolvedBase, deep, state, parentRouter, routes } = host;

    const route = routes.find(r => r.name === name);
    if (!route) {
      if (parentRouter) {
        parentRouter.navigate(name, params, options);
        return;
      }
      throw Error(`Route '${name}' not found.`);
    }

    const { backwards, force } = options;
    const history = window.history.state.slice();
    let index = 0;

    if (backwards) {
      let backState = state;
      for (index = 0; history[index] && history[index][deep]; index += 1) {
        backState = history[index][deep];
        if (force ? backState.name === name : backState.name !== state.name) {
          break;
        }
      }
      index = Math.min(index, history.length - 1);
      if (index > 0) {
        history.splice(0, index);
      }
    }

    const pushState = !backwards && (force || state.name !== name);
    const url = route.getURL(params, resolvedBase);

    const globalState = history[0];

    let nextState;
    if (backwards) {
      nextState = globalState.slice();
      nextState[deep] = {
        ...nextState[deep],
        params,
      };
    } else {
      nextState = globalState.slice(0, deep).concat({
        id: pushState ? globalState[deep].id + 1 : globalState[deep].id,
        name,
        params,
      });
    }

    if (pushState) {
      history.unshift(nextState);
      window.history.pushState(history, null, url);
    } else {
      history[0] = nextState;

      if (backwards && index > 0) {
        const cb = () => {
          window.removeEventListener("popstate", cb);
          window.history.replaceState(history, null);
          dispatch(host, "navigate");
        };

        window.addEventListener("popstate", cb);
        window.history.go(-index);
        return;
      }

      window.history.replaceState(history, null, url);
    }

    dispatch(host, "navigate");
  },

  getURL: host => (name, params = {}, omitQuery = false) => {
    const { resolvedBase, routes, parentRouter } = host;
    const route = routes.find(r => r.name === name);

    if (route) {
      return route.getURL(params, resolvedBase, omitQuery);
    }

    if (parentRouter) {
      return parentRouter.getURL(name, params, omitQuery);
    }

    throw Error(`Route '${name}' not found.`);
  },

  getRoute: host => name => host.routes.find(route => route.name === name),

  isActiveRoute: host => name => {
    if (host.state.name === name) {
      return true;
    }

    if (host.parentRouter) {
      return host.parentRouter.isActiveRoute(name);
    }

    return false;
  },
};

export default AppRouter;
