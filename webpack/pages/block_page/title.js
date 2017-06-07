import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import dateFormat from "dateformat"

import EditableField from "components/editable_field"
import Hint from "components/hint"
import Logo from "components/logo"
import Section from "components/section"
import Markdown from "components/markdown"
import updateBlock from "util/update_block"

import Row from "layout/row"
import Column from "layout/column"

class Title extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      description: this.props.description,
    }
  }

  render() {
    const date = new Date(this.props.created_at);

    return(
      <Row>
        <Logo />

        <Column>
          <h1>
            <a href={`/users/${this.props.user.handle}`}>
              {this.props.user.handle}
            </a>

            &nbsp;/&nbsp;
            <EditableField.String
              editable={this.props.editable}
              initialValue={this.state.name}
              onChange={this.nameUpdated.bind(this)}
              >
              {this.state.name}
            </EditableField.String>
          </h1>

          <Hint>
            Created on {dateFormat(date, "mmmm d, yyyy")}
          </Hint>

          <EditableField.Text
            editable={this.props.editable}
            initialValue={this.state.description}
            onChange={this.descriptionUpdated.bind(this)}
            hint={<div>
              <p>
              If you want other people to use your block, you better explain how it works!
              </p>
              <p>
              We support
              <a href='https://help.github.com/articles/basic-writing-and-formatting-syntax/'>
              Github-Flavored Markdown</a>.
              </p>
            </div>}
            >
            <Markdown source={this.state.description}/>
          </EditableField.Text>
        </Column>
      </Row>
    );
  }

  nameUpdated(newName) {
    this.setState({ name: newName })
    updateBlock({ name: newName }, this.props.id)
  }

  descriptionUpdated(newDescription) {
    this.setState({ description: newDescription })
    updateBlock({ description: newDescription }, this.props.id)
  }
}

Title.propTypes = {
  created_at: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  editable: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
}

export default Title;
