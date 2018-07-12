import "hybrids/shim";

// Set dynamic env variable
window.env = "development";

window.test = fn => spec => {
  const wrapper = document.createElement("div");
  document.body.appendChild(wrapper);

  fn({}, wrapper);
  const promise = spec(wrapper.children[0]);

  Promise.resolve(promise).then(() => {
    document.body.removeChild(wrapper);
  });
};

// let originalURL;
// beforeAll(() => { originalURL = window.location.href; });
// afterAll(() => { window.history.pushState(null, '', originalURL); });

const req = require.context("./spec/", true, /\.js$/);
req.keys().forEach(key => req(key));
