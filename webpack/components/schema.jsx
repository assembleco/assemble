import React from "react"
import PropTypes from "prop-types"
const Freezer = require("freezer-js");
import $ from "jquery"

import ObjectAttribute from "./schema/object_attribute";

class Schema extends React.Component {
  constructor(props) {
    super(props);

    const schema = new Freezer(this.props.initialValue).get();

    this.state = {
      schema: schema
    }

    this.listener = schema.getListener();

    this.updateForm = this.updateForm.bind(this);
  }

  render () {
    return (
      <div style={{ marginBottom: '3rem' }} id="schema-builder">
        <ObjectAttribute
          schema={this.state.schema}
          editable={this.props.editable}
          />
      </div>
    );
  }

  componentDidMount() {
    this.listener.on('update', (updated) => {
      this.setState({ schema: updated });
      this.updateForm();
    });
  }

  updateForm() {
    $(this.props.formElement).val(JSON.stringify(this.state.schema));
  }
}

Schema.propTypes = {
  initialValue: PropTypes.object,
  editable: PropTypes.bool
};

export default Schema;
