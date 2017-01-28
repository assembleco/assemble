// This file defines all of our React.js components.
// They needs a separate manifest from application.js
// so that the React server-side rendering process can pick them up.

//= require_tree ./components

require('babel-polyfill');

global.BlockSandboxForm = require('components/block_sandbox_form.es6').default;
global.AppCanvas = require('components/app_canvas.es6').default;
global.SchemaBuilder = require('components/schema_builder.es6').default;
global.ExploreHero = require('components/explore_hero.es6').default;

global.Form = require("react-jsonschema-form").default;
global.JSONTree = require("react-json-tree").default;
