import React from 'react';
import styled from "styled-components";
import border from "styles/border"

const Section = styled.div`
  background-color: white;
  padding: 1.5rem;
  border: ${border};
  border-radius: 4px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export default Section;
