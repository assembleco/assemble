import React from 'react';
import styled from "styled-components";

const Column = styled.div`
  flex: 0 1 50%;
  margin-right: 1.5rem;
  &:last-child { margin-right: 0; }
`

export default Column;
