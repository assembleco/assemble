import React from "react"
import Section from "components/section"
import Form from "components/form"

import Json from "react-json"

export default (props) => (
  <Json value={{
    hola: "amigo",
    array: [1,2,3]
  }} />
);
