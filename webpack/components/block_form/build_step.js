import React from "react"
import Section from "components/section"
import Form from "components/form"

export default (props) => (
  <div>
    <Form.Input
      attr="source_url"
      model="block"
      value={props.block.source_url}
      required
      >
      <p>
        This must be the URL for a GitHub repository or a GitHub gist.
      </p>
      <p>
        We are working to support additional function sources soon.
      </p>
      <p>
        If you'd like to see another source added,
        please <a href="https://github.com/assembleapp/registry/issues/new">open an issue on GitHub</a>.
      </p>
    </Form.Input>

    <Form.Input
      attr="command"
      model="block"
      value={props.block.command}
      required>
      <p>
        What command would you run to execute your function?
      </p>
    </Form.Input>

    <Form.Input
      attr="environment"
      model="block"
      value={props.block.environment}
      required>
    </Form.Input>
  </div>
);
