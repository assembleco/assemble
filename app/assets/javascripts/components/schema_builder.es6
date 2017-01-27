const Freezer = require("freezer-js");

import GenericAttribute from "components/schema_builder/generic_attribute.es6";

class SchemaBuilder extends React.Component {
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
        <GenericAttribute schema={this.state.schema} />
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

SchemaBuilder.propTypes = {
  initialValue: React.PropTypes.object
};

export default SchemaBuilder;
