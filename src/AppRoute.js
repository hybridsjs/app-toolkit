import pathToRegexp from "path-to-regexp";
import queryString from "query-string";

export default {
  name: "",
  path: "",
  default: false,
  strict: false,
  component: "",

  regExp: ({ path, strict }) =>
    path ? pathToRegexp(path, [], { end: strict }) : null,
  tokens: ({ path }) => (path ? pathToRegexp.parse(path) : []),
  compile: ({ path }) => pathToRegexp.compile(path),

  // METHODS

  isMatch: host => pathname => {
    const { regExp } = host;
    return regExp ? !!regExp.exec(pathname) : null;
  },

  getParams: host => (pathname, search) => {
    const { tokens, regExp } = host;
    if (!regExp) return {};

    const result = { ...queryString.parse(search) };
    const values = regExp.exec(pathname);

    if (values) {
      return values.reduce((acc, value, index) => {
        if (typeof tokens[index] === "object") {
          acc[tokens[index].name] = value;
        }
        return acc;
      }, result);
    }

    return result;
  },

  getURL: host => (params, base = "", omitQuery = false) => {
    const { path, tokens } = host;
    if (!path) return "";

    const query = queryString.stringify(
      Object.keys(params).reduce((acc, key) => {
        if (!tokens.some(token => token.name === key)) {
          acc[key] = params[key];
        }
        return acc;
      }, {}),
    );

    return `${base}${host.compile(params)}${
      query && !omitQuery ? `?${query}` : ""
    }`;
  },
};
