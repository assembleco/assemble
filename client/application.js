import $ from "jquery";
import { mountComponents } from "react-rails-ujs";

import App from "./app";

import BlockPage from "./pages/block_page";
import WelcomePage from "./pages/welcome_page";

import Header from "./components/header";
import JSONTree from "react-json-tree";
import Schema from "./components/schema";

mountComponents({
  App,
  Header,
  JSONTree,
  Schema,
});

$(document).ajaxSend(function(e, xhr, options) {
  var token = $("meta[name='csrf-token']").attr("content");
  xhr.setRequestHeader("X-CSRF-Token", token);
});

$(document).ready(function() {
  const env = $("body")[0].dataset.railsEnv;

  if(env === "test") {
    $.fx.off = true;
    $.ajaxSetup({ async: false });
  }
});
