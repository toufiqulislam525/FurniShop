import React from 'react'
import styled from 'styled-components'

const Testing = () => {
  return (
    <Wrapper>
        <h3>Hello World</h3>
        <p>Hello People</p>
        <button>Click Me</button>

    </Wrapper>
  )
}

const Wrapper = styled.section`
h3{
    color : red;
}
`;

export default Testing;