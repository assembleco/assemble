import React from "react"
const P = React.PropTypes

// Atomic data types
const slug = P.string
const id = P.number
const name = P.string
const icon = P.string
const schema = P.object
const path = P.string

// Composed data types
const feed = {
  name: name.isRequired,
  id: id.isRequired,
  slug: slug.isRequired,
}

const block = {
  icon: icon.isRequired,
  id: id.isRequired,
  name: name.isRequired,
  schema: schema.isRequired,
  slug: slug.isRequired,
  path: path.isRequired,
}

const app = {
  blocks: P.objectOf(P.shape(block)).isRequired,
  connections: P.objectOf(P.arrayOf(slug.isRequired).isRequired).isRequired,
  feeds: P.arrayOf(P.shape(feed)).isRequired,
  id: id.isRequired,
}

export default {
  app: app,
  feed: feed,
  block: block,
};
