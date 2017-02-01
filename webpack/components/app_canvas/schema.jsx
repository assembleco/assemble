import React from "react"

import GenericAttribute from "components/app_canvas/schema/generic_attribute";

class Schema extends React.Component {
  render () {
    return (
      <GenericAttribute schema={this.props.schema} />
    );
  }
}

Schema.propTypes = {
  initialValue: React.PropTypes.object
};

export default Schema;
