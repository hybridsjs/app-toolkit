// eslint-disable-next-line import/prefer-default-export
export const resolveRaf = fn => new Promise((resolve) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      Promise.resolve()
        .then(fn)
        .then(resolve);
    });
  });
});
