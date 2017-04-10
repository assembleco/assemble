import React from "react"
import styled from "styled-components"

class TabNavigation extends React.Component {
  constructor(props) {
    super(props);

    this.tabLabels = Object.keys(this.props.tabs)
    this.state = { activeTab: this.tabLabels[0] };
  }

  render() {
    return (
      <div>
        {this.tabLabels.map(this.renderTabLabel.bind(this))}

        <TabContents>
          {this.props.tabs[this.state.activeTab]}
        </TabContents>
      </div>
    );
  }

  renderTabLabel(label) {
    if(label == this.state.activeTab)
      return(
        <TabLabel
          key={label}
          href="#"
          >
          {this.props.tabLabels[label]}
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

const TabLabel = styled.a`
  display: block;
`

const InactiveTab = styled.a`
  color: #999;
`

const TabContents = styled.div`
  margin-left: 1.5rem;
`

export default TabNavigation;
