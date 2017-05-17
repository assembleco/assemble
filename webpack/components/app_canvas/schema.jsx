import React from "react"
import PropTypes from "prop-types"

import GenericAttribute from "components/app_canvas/schema/generic_attribute";

class Schema extends React.Component {
  render () {
    return (
      <GenericAttribute schema={this.props.schema} />
    );
  }
}

Schema.propTypes = {
  initialValue: PropTypes.object
};

export default Schema;
