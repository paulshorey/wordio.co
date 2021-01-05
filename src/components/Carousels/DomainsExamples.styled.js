import styled from "styled-components";

export const CarouselStyled = styled.div`
  position: relative;
  margin: 0 0.5rem 0 -0.25rem;
  .carousel {
    position: relative;
    /*
     * slider container
     */
    li.carousel__slide {
      overflow: hidden;
      padding: 0 !important;
      height: auto !important;
      > div {
        position: relative !important;
        padding: 0 2%;
      }
    }
    /*
     * each slide
     */
    img.carousel__image {
      display: block;
    }
    .browser {
      position: relative;
      border: solid 2px #383f48;
      box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.33);
      border-radius: 10px;
      background: #383f48;
      overflow: hidden;
      &.top {
        padding-bottom: 1px;
        //margin-bottom: 1rem;
      }
      &.bottom {
        padding-bottom: 1px;
      }
    }
    .bottom-compare-to {
      font-size: 1.125rem;
      margin: 0.75rem 0 0.25rem 0;
      font-weight: 500;
    }
    /*
     * mockup
     */
    .mock-browser,
    .mock-title {
      text-shadow: none;
      white-space: nowrap;
      font-size: 1.125rem;
      line-height: 1rem;
      u,
      b {
        display: inline-block;
        text-decoration: none;
        font-weight: 500;
      }
    }
    .mock-browser {
      background: #373d44;
      u {
        display: block;
        background: #21252e;
        color: #909192;
        border-radius: 1rem;
        margin: 0.33rem 0.75rem 0.44rem;
        padding: 0.25rem 0 0.25rem 0.75rem;
        > * {
          vertical-align: middle;
        }
        b {
          color: white;
        }
      }
    }
    .mock-title {
      display: block;
      padding: 1rem 0 1rem 1.55rem;
      background: #f7d05c;
      color: #2771b1;
      &.domainsbot {
        b {
          font-weight: 700;
        }
      }
      &.ours {
        background: linear-gradient(150deg, hsl(195deg 95% 65%) -25%, hsl(235deg 85% 50%) 125%);
        color: white;
        padding: 1.14rem 0 1.125rem 1.14rem;
        //border-bottom: solid 0.67rem white;
        font-family: Quicksand, sans-serif;
        font-weight: 500;
        font-size: 1rem;
        b {
          font-weight: 700;
        }
      }
    }
    /*
     * controls
     */
    .arrows {
      //display:none;
      position: absolute;
      width: calc(100% + 2rem);
      height: 100%;
      left: -1.125rem;
      pointer-events: none;
      .arrow {
        pointer-events: all;
        position: absolute;
        border-radius: 1.5rem;
        width: 3rem;
        height: 3rem;
        background: none;
        font-size: 3rem;
        line-height: 3rem;
        color: white;
        background: var(--color-accent);
        box-shadow: -1px 2px 3px white;
        border: none;
        outline: none;
        svg {
          position: relative;
          top: -0.1rem;
        }
        &.arrow-right {
          right: -0.25rem;
          svg {
            right: -0.125rem;
          }
        }
        &.arrow-left {
          left: 0;
          svg {
            left: -0.125rem;
          }
        }
        &[disabled] {
          opacity: 0.175;
          cursor: default;
          //border-color: transparent;
        }
      }
      &.top {
        top: 0;
        .arrow {
          top: 44%;
        }
      }
      &.middle {
        top: 0;
        .arrow {
          top: calc(72.5% - 1.25rem);
        }
      }
      &.bottom {
        bottom: -2.25rem;
        .arrow {
          bottom: 1.67rem;
          background: none;
          color: var(--color-accent);
          box-shadow: none;
          &[disabled] {
            opacity: 0;
          }
        }
      }
    }
    .links {
      //display:none;
      margin-top: 0.25rem;
      position: relative;
      pointer-events: none;
      .link {
        pointer-events: all;
        //font-size: 1rem;
        border: none;
        color: var(--color-accent);
        background: none;
        padding: 0;
        margin: 0 0.33rem 0 0;
        cursor: pointer;
        text-decoration: underline;
        &.link-left {
          position: relative; // so container does not collapse!
          left: 0.33rem;
        }
        &.link-right {
          position: absolute;
          right: 0;
        }
        &[disabled] {
          opacity: 0; // keep display:block, so container does not collapse!
          visibility: hidden;
          //text-decoration: none;
          //opacity: 0.5;
          //cursor: default;
        }
      }
    }
  }
`;
