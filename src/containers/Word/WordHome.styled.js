import styled from "styled-components"

export const StyledHome = styled.div`
  font-size: 1.125rem;
  position: relative;
  padding-top: 2.5rem;
  padding-bottom: 1rem;
  color: #182026;
  min-height: 100vh;
  background: white;
  section {
    margin: 0 0 2.5rem 2px;
    h3 {
      margin-left: -2px;
    }
  }
  h1,
  h2,
  h3,
  h4,
  b,
  strong {
    font-weight: 600;
  }
  .text {
    padding-left: 1rem;
    border-left: solid 4px #efefef;
    color: #666;
  }
  p + .text {
    margin-top: 0.75rem;
  }
`
