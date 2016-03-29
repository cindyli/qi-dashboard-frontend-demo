# Quality Infrastructure - Frontend Demo Code

## Developing

- `npm install`
- `grunt copy:frontEndDependencies`

This copies necessary front-end dependencies from `node_modules` to `src/lib`

## Building a Redistributable Single File Version

- `npm install`
- `grunt copy:frontEndDependencies`
- `grunt dist`

This produces four single-file versions of the dependencies in the `/dist` directory:
- non-minified with all dependencies
- minified with all dependencies
- non-minified without jQuery
- minified with jQuery

## Libraries Used
- jQuery / jQuery UI
- Infusion
- D3
- Floe Chart Authoring Tool

## The Demos

The demos in `/demos` assumes a single-file distribution has been built and use it in their markup; the demos are intended to guide those implementing the QI panels into their own site.
