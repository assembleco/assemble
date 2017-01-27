const connections = React.PropTypes.objectOf(React.PropTypes.arrayOf(React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  slug: React.PropTypes.string.isRequired,
})));

const feeds = React.PropTypes.arrayOf(React.PropTypes.shape({
  name: React.PropTypes.string.isRequired,
  id: React.PropTypes.number.isRequired,
  slug: React.PropTypes.string.isRequired,
}));

const app = React.PropTypes.shape({
  id: React.PropTypes.number.isRequired,
  feeds: feeds.isRequired,
  connections: connections.isRequired,
});

export default {
  app: app,
  connections: connections,
  feeds: feeds,
};
