import React from "react"
import PropTypes from "prop-types"
const Freezer = require("freezer-js");
import $ from "jquery"

import ObjectAttribute from "./schema/object_attribute";
import Hint from "components/hint"

class Schema extends React.Component {
  constructor(props) {
    super(props);

    const schema = new Freezer(this.props.initialValue).get();

    this.state = {
      schema: schema
    }

    this.listener = schema.getListener();
  }

  render () {
    return (
      <div style={{ marginBottom: '3rem' }} id="schema-builder">
        <Hint>
          What information does this block need in order to run correctly?
          Users will be responsible for providing this information
          whenever they run your block.
        </Hint>
        <Hint>
          A checkbox indicates that a field is required.
        </Hint>

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
      this.props.onChange(updated);
    });
  }
}

Schema.propTypes = {
  initialValue: PropTypes.object,
  editable: PropTypes.bool
};

export default Schema;
