import React from "react"
import Section from "components/section"
import Form from "components/form"

import Schema from "components/schema"

export default (props) => (
  <div>
    <Form.Input
      attr="name"
      model="block"
      required
      value={props.block.name}
      />

    <Form.Input
      attr="description"
      model="block"
      required
      type="text"
      value={props.block.description}
      >
      <p>
        If you want other people to use your block, you better explain how it works!
      </p>
      <p>
        We support
        <a href='https://help.github.com/articles/basic-writing-and-formatting-syntax/'> Github-Flavored Markdown</a>.
      </p>
    </Form.Input>

    <Form.Input
      attr="schema_json"
      id="schema_json"
      model="block"
      required
      type="text"
      value={JSON.stringify(props.block.schema)}
      >
      <p>
        What information does this block need in order to run correctly?
        Users will be responsible for providing this information
        whenever they run your block.
      </p> <p>
        A checkbox indicates that a field is required.
      </p>
    </Form.Input>
  </div>
);

    // <Schema
      // initialValue={props.block.schema}
      // formElement="#schema_json"
      // editable
      // />
