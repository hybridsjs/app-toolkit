import { html } from "hybrids";

export default html`
  <style>
    :host { display: flex; flex-direction: column; flex: 0 0 auto;}
    :host([hidden]) { display: none }

    [flex-layout] { display: flex; flex-direction: column; flex: 0 0 auto; }

    [flex-layout^="row"] { flex-direction: row }
    [flex-layout^="row-reverse"] { flex-direction: row-reverse }
    [flex-layout^="column"] { flex-direction: column }
    [flex-layout^="column-reverse"] { flex-direction: column-reverse }

    [flex-layout~="wrap"] { flex-wrap: wrap; }
    [flex-layout~="nowrap"] { flex-wrap: nowrap; }
    [flex-layout~="inline"] { display: inline-flex }
    [flex-layout~="overflow"] { overflow: auto; overscroll-behavior: contain; }

    [flex-layout~="start"] { justify-content: flex-start }
    [flex-layout~="end"] { justify-content: flex-end }
    [flex-layout~="center"] { justify-content: center }
    [flex-layout~="stretch"] { justify-content: stretch }
    [flex-layout~="space-around"] { justify-content: space-around }
    [flex-layout~="space-between"] { justify-content: space-between }
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

    [flex-shrink] { flex-shrink: 1; }
  </style>
`;
