class EmptyState extends React.Component {
  render() {
    return (
      <div>
        <label>When should your app run?</label>

        <select onChange={this.props.onAddFeed}>
          <option value="select">Run my app when...</option>

          { this.props.all_feeds.map((option, index) =>
            <option key={option.value} value={option.value}>{option.label}</option>
          ) }
        </select>
      </div>
    );
  }
}

export default EmptyState;
