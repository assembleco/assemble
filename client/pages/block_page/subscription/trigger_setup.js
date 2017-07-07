import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Column from "layout/column"
import EditableField from "components/editable_field"
import Hint from "components/hint"
import Row from "layout/row"
import updateBlock from "util/update_block"

const TriggerSetup = (props) => (
  <div>
    <Settings>
      <h3>Settings</h3>

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
      <h3>Sample Data</h3>

      <Hint>
        {props.service.name} will send these inputs to your block
        every time your block runs.
      </Hint>

      <pre>
      { JSON.stringify(props.sample_data, null, 2) }
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
  editable: PropTypes.bool.isRequired,
  sample_data: PropTypes.object.isRequired,

  service: PropTypes.shape({
    name: PropTypes.string.isRequired,
    domain: PropTypes.string.isRequired,
  }),

  options: PropTypes.object.isRequired,
  settingUpdated: PropTypes.func.isRequired,
}

export default TriggerSetup;
