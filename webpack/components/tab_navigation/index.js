import React from "react"
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
    if(label == this.state.activeTab)
      return(
        <TabLabel
          key={label}
          href="#"
          >
          {label}
        </TabLabel>
      );

    else return(
      <InactiveTab
        key={label}
        href="#"
        onClick={() => this.setState({activeTab: label})}
        >
        {label}
      </InactiveTab>
    );
  }
}

TabNavigation.propTypes = {
  tabs: React.PropTypes.object.isRequired,
}

const TabHeading = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgrey;
`

const TabLabel = styled.a`
  display: block;
  padding-bottom: 0.75rem;
`

const InactiveTab = styled(TabLabel)`
  color: #999;
`

export default TabNavigation;
