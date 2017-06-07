import React from "react"
import PropTypes from "prop-types"

import SyntaxHighlighter from 'react-syntax-highlighter';

import Hint from "components/hint"

const RubySnippet = (props) => (
  <div>
    <Hint>
    Tested on Ruby 2.4.1
    </Hint>

    <SyntaxHighlighter language="ruby">
{
`require 'net/http'
require 'uri'

ASSEMBLE_USER_KEY = "${props.user_api_key}"

input = '${JSON.stringify({ data: props.input_data }, null, 2)}'

uri = URI('${ props.run_block_url }')
result = Net::HTTP.post(
  uri,
  input,
  "Content-Type" => "application/json",
  "Accept" => "application/json",
  "Authorization" => "Bearer #{ASSEMBLE_USER_KEY}",
)

if result.code == "200"
  puts result.body
else
  puts "Something went wrong."
end
`
}
    </SyntaxHighlighter>
  </div>
);

RubySnippet.propTypes = {
  run_block_url: PropTypes.string.isRequired,
  user_api_key: PropTypes.string.isRequired,
  input_data: PropTypes.object,
}

export default RubySnippet;
