import styled from "styled-components";

export const _ = styled.span`
  width: 0.05rem;
  display: inline-block;
`;
export const __ = styled.span`
  width: 0.1rem;
  display: inline-block;
`;
export const ___ = styled.span`
  width: 0.175rem;
  display: inline-block;
`;

export const H5Styled = styled.h5`
  color: var(--color-link);
  font-weight: 600;
  font-size: 0.85rem;
  line-height: 1.5rem;
  margin: 0.8rem 0 0.4rem;
  &.attention {
    color: var(--color-attention);
  }
  &.options {
    margin: 1rem 0 0;
  }
`;

export const ShowLinkStyled = styled.span`
  background: transparent;
  user-select: none;
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  text-align: right;
  height: 2rem;
  line-height: 1.125rem;
  border-radius: 1.125rem;
  margin-right: -1px;
  padding: 0;
  a,
  .link {
    & > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
  svg {
    transform: scale(0.9);
  }
  svg.faTimes {
    transform: scale(1.1);
    vertical-align: -0.312rem;
  }
`;

export const ColorsStyled = styled.div`
  // default not available
  .dom_name,
  .dom_name .ant-checkbox {
    color: hsl(0, 0%, 67%);
  }
  // not checked yet
  .dom_name.status-unknown,
  .dom_name.status-unknown .ant-checkbox {
    color: var(--color-medium);
  }
  // available
  .dom_name.status-available,
  .dom_name.status-available .ant-checkbox {
    color: var(--color-accent-darker);
    //.icon {
    //  color: var(--color-accent);
    //}
  }
  // available
  .dom_name.status-available-dotcom,
  .dom_name.status-available-dotcom .ant-checkbox {
    color: var(--color-accent-darker);
    .word {
      //text-decoration: underline;
    }
    //.dom_card {
    //  &::before {
    //    content: " ";
    //    position: absolute;
    //    top: 0;
    //    left: 0;
    //    right: 0;
    //    bottom: 0;
    //    border-radius: 1.25rem;
    //    box-shadow: 0 0 0.2px 1px var(--color-accent-darker) inset;
    //  }
    //  //border: solid 1.5px var(--color-accent-darker);
    //  //height: calc(2.3rem + 2px) !important;
    //}
  }
  // premium
  .dom_name.status-premium,
  .dom_name.status-premium .ant-checkbox {
    color: var(--color-accent-darker);
    /*.word {
      text-decoration: underline;
    }*/
  }
  // premium
  .dom_name.status-premium-dotcom,
  .dom_name.status-premium-dotcom .ant-checkbox {
    color: var(--color-accent-darker);
    //.word {
    //  text-decoration: underline;
    //}
    //.dom_card {
    //  &::before {
    //    content: " ";
    //    position: absolute;
    //    top: 0;
    //    left: 0;
    //    right: 0;
    //    bottom: 0;
    //    border-radius: 1.25rem;
    //    box-shadow: 0 0 0.2px 1px var(--color-accent) inset;
    //  }
    //  //border: solid 1.5px var(--color-accent);
    //  //height: calc(2.3rem + 2px) !important;
    //}
  }
  // unknown
  .dom_name.status-other,
  .dom_name.status-other .ant-checkbox {
    color: var(--color-other);
  }
  // premium
  .dom_name.status-expiring,
  .dom_name.status-expiring .ant-checkbox {
    color: var(--color-other);
  }
  // exact match available!
  .dom_name.status-exact,
  .dom_name.status-exact .ant-checkbox {
    //color: var(--color-accent);
    .dom_card {
      //box-shadow: 0 1px 1px currentColor !important;
      &::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 1.25rem;
        box-shadow: 0 0 0.2px 1px currentColor inset;
      }
    }
  }

  /*
   * domain suggestions (while getting availability, until received results)
   */
  &.gotAvailability {
  }
`;
