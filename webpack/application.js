import $ from "jquery";
import { mountComponents } from "react-rails-ujs";

import BlockSandboxForm from "./components/block_sandbox_form";
import BlockUsage from "./components/block_usage";
import Header from "./components/header";
import JSONTree from "react-json-tree";
import BlockForm from "./components/block_form";
import Schema from "./components/schema";
import ServiceIndex from "./components/service_index";

mountComponents({
  BlockSandboxForm,
  BlockUsage,
  Header,
  JSONTree,
  BlockForm,
  Schema,
  ServiceIndex,
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
