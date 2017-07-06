import React from "react"
import PropTypes from "prop-types"
import ReactMarkdown from "react-markdown"

const Markdown = (props) => (
  <ReactMarkdown skipHtml source={props.source} />
)

Markdown.propTypes = {
  source: PropTypes.string.isRequired,
}

export default Markdown;
