import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Column from "layout/column"
import EditableField from "components/editable_field"
import Hint from "components/hint"
import Row from "layout/row"
import updateBlock from "util/update_block"

const information = {
  ref: "string",
  head: "string",
  before: "string",
  size: 123,
  distinct_size: 123,
  commits: [{
    sha: "string",
    message: "string",
    author: {
      name: "string",
      email: "string",
    },
    url: "string",
    distinct: true,
  }]
}

const TriggerSetup = (props) => (
  <div>
    <h3>{props.service.name}: {props.name}</h3>

    <Settings>
      <h4>Settings</h4>

      {props.editable ||
        <Hint>
          These settings are locked in place while the trigger is active.
        </Hint>
      }

      {Object.keys(props.options).map((settingName) => (
        <Row key={settingName}>
          <Column>{settingName}:</Column>
          <Column>
            <EditableField.String
              editable={props.editable}
              onChange={(newVal) => props.settingUpdated(settingName, newVal)}
              initialValue={props.options[settingName]}
            >
              {props.options[settingName]}
            </EditableField.String>
          </Column>
        </Row>
      ))}
    </Settings>

    <Information>
      <h4>Event Information</h4>

      <Hint>
        Each time this event fires,
        it will provide this information to your block.
      </Hint>

      <pre>
      { JSON.stringify(information, null, 2) }
      </pre>
    </Information>
  </div>
)

const Settings = styled.div`
  margin-bottom: 1.5rem;
`

const Information = styled.div`
`

TriggerSetup.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  options_schema: PropTypes.object.isRequired,
  data_schema: PropTypes.object.isRequired,
  editable: PropTypes.bool.isRequired,

  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
  }),

  options: PropTypes.object.isRequired,
  settingUpdated: PropTypes.func.isRequired,
}

export default TriggerSetup;
