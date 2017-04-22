import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import Section from "components/section"

class TabNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.tabLabels = Object.keys(this.props.tabs)
    this.state = { activeTab: this.props.activeTab || this.tabLabels[0] };
  }

  render() {
    return (
      <Section>
        <TabHeading>
          {this.tabLabels.map(this.renderTabLabel.bind(this))}
        </TabHeading>

        <div>
          {this.props.tabs[this.state.activeTab]}
        </div>
      </Section>
    );
  }

  renderTabLabel(label) {
    return(
      <TabLabel
        key={label}
        href="#"
        active={label == this.state.activeTab}
        onClick={() => this.setState({activeTab: label})}
        >
        {this.props.labels[label]}
      </TabLabel>
    );
  }
}

TabNavigation.propTypes = {
  tabs: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired,
}

const TabHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
`

const TabLabel = styled.a`
  display: block;
  padding-bottom: 0.75rem;
  color: ${props => props.active ? "auto" : "#999" };
`

TabNavigation.TabLabel = TabLabel;

export default TabNavigation;
