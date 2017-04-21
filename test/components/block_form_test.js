import React from "react"
import { mount } from "enzyme"
import { expect } from 'chai';

import BlockForm from "../../webpack/components/block_form"

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

      expect(form.find("input[type='text']")).to.have.length(3);
    });
  });

  describe("Test tab", () => {
  });

  describe("Publish tab", () => {
  });
});
