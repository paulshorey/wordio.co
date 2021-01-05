import styled from "styled-components"
import React from "react"
import { is_retina } from "@twodashes/universal/cjs/ui"

export const DomainsResultsStyled = styled.div`
  .results {
    //margin-top: 0.5rem;
  }
  .cue {
    color: var(--color-subtle);
    //font-weight: 600;
    .faStar {
      transform: scale(0.85);
    }
    > * {
      position: relative;
      top: -0.1875rem;
      &:last-child {
        top: 0;
      }
    }
  }
  .showThesaurus {
    color: var(--color-subtle);
  }
  .spellchecked {
    color: var(--color-subtle-transparent);
  }
  .container {
    position: relative;
    color: #182026;
    min-height: 100vh;
    overflow:hidden;
    
    background: linear-gradient(180deg,hsl(200deg,100%,95%) 0px,hsl(210deg,100%,90%) 500px);
    
    // background: ${is_retina() ? "var(--color-subtle-light-retina)" : "var(--color-subtle-light)"};
    //background: ${is_retina() ? "hsl(215,95%,95%)" : "hsl(212,100%,96%)"};
    padding: 0.45rem 0 5rem;
    font-size: 1.125rem;
    .results {
      .flex {
        display: flex;
      }
    }
  }
`
