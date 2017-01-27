import PropDefinitions from "prop_definitions.es6"
import Schema from "components/app_canvas/schema.es6"

import SchemaField from "react-jsonschema-form/lib/components/fields/SchemaField";
const CustomSchemaField = (props) => <SchemaField {...props} required={ false } />;
const fields = { SchemaField: CustomSchemaField };

class Block extends React.Component {
  constructor(props) {
    super(props);

    this.saveChanges = this.saveChanges.bind(this);
  }

  render() {
    return (
      <div style={Block.styles.container}>
        <Form
          formData={this.props.app.defaults[this.props.slug]}
          noHtml5Validate={ true }
          noValidate={ true }
          onSubmit={this.saveChanges}
          fields={fields}
          schema={this.props.schema}
          >
          <div className="hint">
          If provided, these values will overwrite values ouptut by the above script.
          </div>
          <button>Save Changes</button>
        </Form>

        <div style={Block.styles.label}>
          <img
            src={"/assets/" + this.props.icon}
            style={ {
             height: "2em",
             marginRight: "0.75rem",
            } }
            />

          { this.props.name }
        </div>
      </div>
    );
  }

  saveChanges({ formData }) {
    const data = {
      defaults: formData,
      app_id: this.props.app.id,
      slug: this.props.slug,
    };

    $.post("/defaults", data, () => { location.reload(); });
  }
}

Block.propTypes = {
  icon: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  schema: React.PropTypes.object.isRequired,
  app: PropDefinitions.app.isRequired,
}

Block.styles = {
  container: {
    border: "1px solid #ddd",
    padding: "0.75rem",
  },
  label: {
    display: "flex",
    alignItems: "center",
  },
}

export default Block;
