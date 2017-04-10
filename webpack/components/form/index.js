import React from "react"
import $ from "jquery"
import styled from "styled-components"

import Section from "components/section"

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = { authenticity_token: '' }
  }

  componentDidMount() {
    let auth_token = $('meta[name="csrf-token"]').attr('content');

    this.setState({authenticity_token: auth_token});
  }

  render() {
    let action = this.props.submit.url;
    let method = this.props.submit.method;

    return (
      <form {...{action, method}} >
        <input type="hidden" name="authenticity_token" value={this.state.authenticity_token} />

        {this.props.children}
      </form>
    );
  }
}

const Submit = (props) =>
  <input
  type="submit"
  name="commit"
  value={props.submit.label}
  />

class Input extends React.Component {
  render() {
    return (
      <InputWrapper>
        <label htmlFor={this.props.attr}>
          {this.props.attr}
        </label>

        <Hint>
          {this.props.children}
        </Hint>

        { this.renderInputField() }
      </InputWrapper>
    );
  }

  renderInputField() {
    let name = `${this.props.model}[${this.props.attr}]`;

    let props = {
      name: name,
      id: this.props.attr,
      defaultValue: this.props.value,
    };

    if(this.props.type == "text")
      return <textarea type="text" {...props} />;

    if(this.props.type == "hidden")
      return <input type="hidden" {...props} />;

    return <input type="text" {...props} />;
  }
}

Form.propTypes = {
  submit: React.PropTypes.shape({
    method: React.PropTypes.string.isRequired,
    url: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
  }).isRequired,
}

Form.Input = Input;
Form.Submit = Submit;

const Hint = styled.div`
  color: #999;
  margin-bottom: 0.75rem;
`

const InputWrapper = styled.div`
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
`

export default Form;
