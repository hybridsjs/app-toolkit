import AppRouter from "./AppRouter";

export default {
  router: AppRouter.parentRouter,
  route: "",
  params: {},
  backwards: false,
  force: false,

  href: ({ router, route, params }) => route && router.getURL(route, params),
  navigate: ({ route, href, params, router, backwards, force }) => (
    host,
    event,
  ) => {
    if (href && event) {
      const { metaKey, ctrlKey } = event;
      if (metaKey || ctrlKey) return true;
      event.preventDefault();
    }

    return router.navigate(route, params, { backwards, force });
  },
  active: ({ router, route }) => router.isActiveRoute(route),
};
