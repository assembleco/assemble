import React from "react"
import { mount } from "enzyme"
import { expect } from 'chai';

import BlockForm from "../../webpack/components/block_form"
import TabNavigation from "../../webpack/components/tab_navigation"

var assert = require("assert");

const defaultProps = {
  block: {},
  submit: {
    label: "Submit",
    method: "POST",
    url: "/form_endpoint",
  },
  title: "Block Form",
}

describe("<BlockForm/>", () => {
  describe("Build tab", () => {
    it("displays relevant form fields", () => {
      const form = mount(<BlockForm {...defaultProps} />);

      expect(form.find("input#source_url")).to.have.length(1);
      expect(form.find("input#command")).to.have.length(1);
      expect(form.find("input#environment")).to.have.length(1);
    });
  });

  describe("Test tab", () => {
    // Not implemented
  });

  describe("Publish tab", () => {
    it("displays form fields", () => {
      const form = mount(<BlockForm {...defaultProps} />);

      form.find(TabNavigation.TabLabel).last().simulate("click")

      expect(form.find("input#name")).to.have.length(1);
      expect(form.find("textarea#description")).to.have.length(1);
      expect(form.find("textarea#schema_json")).to.have.length(1);
    });
  });
});
