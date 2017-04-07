import $ from "jquery";

import BlockUsage from "./components/block_usage";
import BlockSandboxForm from "./components/block_sandbox_form";
import Header from "./components/header";
import Claim from "./components/claim";
import NewClaim from "./components/new_claim";
import Schema from "./components/schema";
import ServiceIndex from "./components/service_index";
import JSONTree from "react-json-tree";

import { mountComponents } from "react-rails-ujs";

mountComponents({
  BlockSandboxForm,
  BlockUsage,
  Header,
  Claim,
  JSONTree,
  NewClaim,
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
