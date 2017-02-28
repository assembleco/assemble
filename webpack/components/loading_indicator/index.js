import React from 'react';
import styled, { keyframes } from 'styled-components';

const dotSizePx = 8;
const offsetPx = dotSizePx * 2;

const dotSize = `${dotSizePx}px`;
const offset = `${offsetPx}px`;

const animation = keyframes`
0% {
  box-shadow:
  #f86 -${offset} -${offset} 0 ${dotSize},
  #fc6 ${offset} -${offset} 0 ${dotSize},
  #6d7 ${offset} ${offset} 0 ${dotSize},
  #4ae -${offset} ${offset} 0 ${dotSize};
}
8.33% {
  box-shadow:
  #f86 ${offset} -${offset} 0 ${dotSize},
  #fc6 ${offset} -${offset} 0 ${dotSize},
  #6d7 ${offset} ${offset} 0 ${dotSize},
  #4ae -${offset} ${offset} 0 ${dotSize};
}
16.67% {
  box-shadow: #f86 ${offset} ${offset} 0 ${dotSize},
  #fc6 ${offset} ${offset} 0 ${dotSize},
  #6d7 ${offset} ${offset} 0 ${dotSize},
  #4ae -${offset} ${offset} 0 ${dotSize};
}
25% {
  box-shadow:
  #f86 -${offset} ${offset} 0 ${dotSize},
  #fc6 -${offset} ${offset} 0 ${dotSize},
  #6d7 -${offset} ${offset} 0 ${dotSize},
  #4ae -${offset} ${offset} 0 ${dotSize};
}
33.33% {
  box-shadow:
  #f86 -${offset} -${offset} 0 ${dotSize},
  #fc6 -${offset} ${offset} 0 ${dotSize},
  #6d7 -${offset} -${offset} 0 ${dotSize},
  #4ae -${offset} -${offset} 0 ${dotSize};
}
41.67% {
  box-shadow:
  #f86 ${offset} -${offset} 0 ${dotSize},
  #fc6 -${offset} ${offset} 0 ${dotSize},
  #6d7 -${offset} -${offset} 0 ${dotSize},
  #4ae ${offset} -${offset} 0 ${dotSize};
}
50% {
  box-shadow:
  #f86 ${offset} ${offset} 0 ${dotSize},
  #fc6 -${offset} ${offset} 0 ${dotSize},
  #6d7 -${offset} -${offset} 0 ${dotSize},
  #4ae ${offset} -${offset} 0 ${dotSize};
}
58.33% {
  box-shadow:
  #f86 -${offset} ${offset} 0 ${dotSize},
  #fc6 -${offset} ${offset} 0 ${dotSize},
  #6d7 -${offset} -${offset} 0 ${dotSize},
  #4ae ${offset} -${offset} 0 ${dotSize};
}
66.67% {
  box-shadow:
  #f86 -${offset} -${offset} 0 ${dotSize},
  #fc6 -${offset} -${offset} 0 ${dotSize},
  #6d7 -${offset} -${offset} 0 ${dotSize},
  #4ae ${offset} -${offset} 0 ${dotSize};
}
75% {
  box-shadow:
  #f86 ${offset} -${offset} 0 ${dotSize},
  #fc6 ${offset} -${offset} 0 ${dotSize},
  #6d7 ${offset} -${offset} 0 ${dotSize},
  #4ae ${offset} -${offset} 0 ${dotSize};
}
83.33% {
  box-shadow:
  #f86 ${offset} ${offset} 0 ${dotSize},
  #fc6 ${offset} -${offset} 0 ${dotSize},
  #6d7 ${offset} ${offset} 0 ${dotSize},
  #4ae ${offset} ${offset} 0 ${dotSize};
}
91.67% {
  box-shadow:
  #f86 -${offset} ${offset} 0 ${dotSize},
  #fc6 ${offset} -${offset} 0 ${dotSize},
  #6d7 ${offset} ${offset} 0 ${dotSize},
  #4ae -${offset} ${offset} 0 ${dotSize};
}
100% {
  box-shadow:
  #f86 -${offset} -${offset} 0 ${dotSize},
  #fc6 ${offset} -${offset} 0 ${dotSize},
  #6d7 ${offset} ${offset} 0 ${dotSize},
  #4ae -${offset} ${offset} 0 ${dotSize};
}
`

const LoadingIndicator = styled.div`
  animation: ${animation} 5s infinite ease-in-out;
  border-radius: 100%;
  box-shadow: #f86 -${offset} -${offset} 0 ${dotSize}, #fc6 ${offset} -${offset} 0 ${dotSize}, #6d7 ${offset} ${offset} 0 ${dotSize}, #4ae -${offset} ${offset} 0 ${dotSize};
  height: 8px;
  overflow: hidden;
  position: relative;
  width: 8px;
`

const Container = styled.div`
  width: 3rem;
  height: 3rem;
  transform: translate(${2*offsetPx}px, ${3*offsetPx}px)
  margin-bottom: 3rem;
`

export default () => <Container><LoadingIndicator/></Container>;
