import { html } from "hybrids";

export const flexbox = html`
  <style>
    :host { display: flex; flex-direction: column; flex: 0 0 auto;}
    :host([hidden]) { display: none }

    [flex-box] { display: flex; flex-direction: column; flex: 0 0 auto; }

    [flex-box~="inline"] { display: inline-flex }
    [flex-box~="overflow"] { overflow: auto; overscroll-behavior: contain; }

    [flex-box~="row"] { flex-direction: row }
    [flex-box~="row-reverse"] { flex-direction: row-reverse }
    [flex-box~="column"] { flex-direction: column }
    [flex-box~="column-reverse"] { flex-direction: column-reverse }
    [flex-box~="wrap"] { flex-wrap: wrap; }
    [flex-box~="nowrap"] { flex-wrap: nowrap; }

    [flex-layout^="start"] { justify-content: flex-start }
    [flex-layout^="end"] { justify-content: flex-end }
    [flex-layout^="center"] { justify-content: center }
    [flex-layout^="stretch"] { justify-content: stretch }
    [flex-layout^="space-around"] { justify-content: space-around }
    [flex-layout^="space-between"] { justify-content: space-between }
    [flex-layout$="start"] { align-items: flex-start }
    [flex-layout$="end"] { align-items: flex-end }
    [flex-layout$="center"] { align-items: center }
    [flex-layout$="stretch"] { align-items: stretch }

    [flex-grow] { flex-shrink: 1; min-height: 0; min-width: 0; }

    [flex-grow=''],
    [flex-grow='1'] { flex-grow: 1 }
    [flex-grow='2'] { flex-grow: 2 }
    [flex-grow='3'] { flex-grow: 3 }
    [flex-grow='4'] { flex-grow: 4 }
    [flex-grow='5'] { flex-grow: 5 }
    [flex-grow='6'] { flex-grow: 6 }
    [flex-grow='7'] { flex-grow: 7 }
    [flex-grow='8'] { flex-grow: 8 }
    [flex-grow='9'] { flex-grow: 9 }
    [flex-grow='10'] { flex-grow: 10 }

    [flex-shrink='0'] { flex-shrink: 0 }
    [flex-shrink], [flex-shrink='1'] { flex-shrink: 1; }
  </style>
`;

const RENDER_PLACEHOLDER = `{{prop-${Date.now()}}}`;

export function renderElement(tagName, props) {
  const args = [];
  let template = `<${tagName}`;

  Object.keys(props).forEach(key => {
    template += ` ${key}="${RENDER_PLACEHOLDER}"`;
    args.push(props[key]);
  });
  template += `></${tagName}>`;

  return html(template.split(RENDER_PLACEHOLDER), ...args);
}
