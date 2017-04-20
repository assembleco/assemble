import React from "react"
import $ from "jquery"
import styled from "styled-components"
import { Page, Row, Column } from 'hedron';

import Form from "components/form"
import Hint from "components/hint"
import TabNavigation from "components/tab_navigation"

import BuildStep from "./build_step";
import TestStep from "./test_step";
import PublishStep from "./publish_step";

class BlockForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { authenticity_token: '' }
  }

  componentDidMount() {
    let auth_token = $('meta[name="csrf-token"]').attr('content');

    this.setState({authenticity_token: auth_token});
  }

  render() {
    return (
      <Form submit={this.props.submit} >
        <CenteredColumn>
          <h1>{this.props.title}</h1>
        </CenteredColumn>

        <TabNavigation
          labels={{
            1: "Step 1: Build",
            2: "Step 2: Test",
            3: "Step 3: Publish",
          }}
          tabs={{
            1: <BuildStep block={this.props.block} />,
            2: <TestStep block={this.props.block} />,
            3: <PublishStep block={this.props.block} />,
          }}
        />

        <CenteredColumn>
          <Form.Submit submit={this.props.submit} />
        </CenteredColumn>
      </Form>
    );
  }
}

BlockForm.propTypes = {
  block: React.PropTypes.object.isRequired,
  submit: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired,
}

const CenteredColumn = styled(Column)`
  text-align: center;
`

const Hidden = styled.div`
  visibility: hidden;
`

export default BlockForm;
