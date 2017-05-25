import React from "react"
import PropTypes from "prop-types"

import Hint from "components/hint"

class RubySnippet extends React.Component {
  render() {
    return (
      <div>
        <Hint>
        Tested on Ruby 2.4.1
        </Hint>

        <pre>
{
`require 'net/http'
require 'uri'

ASSEMBLE_USER_KEY = "${this.props.user_api_key}"

uri = URI('${ this.props.run_block_url }.json')
result = Net::HTTP.post(
  uri,
  '${JSON.stringify({ data: this.props.input_data }, null, 2)}',
  "Content-Type" => "application/json",
  "Accept" => "application/json",
  "Authorization" => "Bearer ${this.props.user_api_key}",
)

if result.code == "200"
  puts result.body
else
  puts "Something went wrong."
end
`
}
        </pre>
      </div>
    );
  }
}

RubySnippet.propTypes = {
  run_block_url: PropTypes.string.isRequired,
  user_api_key: PropTypes.string.isRequired,
  input_data: PropTypes.object,
}

export default RubySnippet;
