import React from "react"
import $ from "jquery"

import Form from "react-jsonschema-form"
// TODO this instance of the `Form` constant is being polluted
// by the instance required from `app_canvas/block`.
import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
const fields = { SchemaField: SchemaField };

class BlockSandboxForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { mounted: false};
    this.onSubmit = this.onSubmit.bind(this);
  }

  render () {
    return (
      <Form
        schema={this.props.schema}
        formData={this.props.form_data}
        onSubmit={this.onSubmit}
        fields={fields}
        >
        <button type="submit">Go</button>
      </Form>
    );
  }

  onSubmit(event) {
    const data = { event: event.formData };
    $.post(this.props.submit_url, data, () => { location.reload(); });
  }
}

BlockSandboxForm.propTypes = {
  schema: React.PropTypes.object
};

export default BlockSandboxForm;
