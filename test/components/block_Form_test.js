import React from "react"
import { shallow } from "enzyme"
import { expect } from 'chai';

import BlockForm from "../../webpack/components/block_form"
import TabNavigation from "../../webpack/components/tab_navigation"

var assert = require("assert");

describe("<BlockForm/>", () => {
  it("renders a <TabNavigation/>", () => {
    const wrapper = shallow(<BlockForm />);

    expect(wrapper.find(TabNavigation)).to.have.length(1);
  });
});
