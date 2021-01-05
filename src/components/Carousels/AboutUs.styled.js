import styled from "styled-components"

export const ImageDivStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
  }
  &.ImageWithZoom {
    div {
      width: 100%;
      height: 100%;
      background-position: center;
    }
  }
`

export const CarouselStyled = styled.div`
  margin: 1.25rem 0.5rem 1.75rem -0.25rem;
  .carousel {
    position: relative;
    li.carousel__slide {
      border-radius: 2px;
      overflow: hidden;
      margin-right: 0.5vw;
      margin-left: 0.5vw;
    }
    img.carousel__image {
      padding: 0 1%;
    }
    .arrows {
      position: absolute;
      height: calc(100% - 4rem);
      width: calc(100% + 2rem);
      left: -1rem;
      top: 0;
      pointer-events: none;
      .arrow {
        pointer-events: all;
        position: absolute;
        border-radius: 1.25rem;
        width: 2.5rem;
        height: 2.5rem;
        top: 45%;
        font-size: 2.5rem;
        line-height: 2.6rem;
        //box-shadow: var(--box-shadow-dark);
        color: white;
        background: linear-gradient(45deg, var(--color-link), hsl(205, 100%, 56%), var(--color-link));
        box-shadow: -1px 2px 3px white;
        border: none;
        outline: none;
        &:hover {
          background: var(--color-link);
        }
        svg {
          position: relative;
          top: -0.1rem;
        }
        &.arrow-right {
          right: 0;
          svg {
            right: -0.075rem;
          }
        }
        &.arrow-left {
          svg {
            left: -0.075rem;
          }
        }
        &[disabled] {
          opacity: 0.25;
          cursor: default;
        }
      }
    }
    .links {
      margin-top: 0.25rem;
      position: relative;
      .link {
        font-size: 0.9rem;
        border: none;
        color: var(--color-accent-dark);
        background: none;
        padding: 0;
        margin: 0 0.75rem 0 0;
        cursor: pointer;
        text-decoration: underline;
        &.link-right {
          position: absolute;
          right: 0;
        }
        &[disabled] {
          opacity: 0;
          visibility: hidden;
          //text-decoration: none;
          //opacity: 0.5;
          //cursor: default;
        }
      }
    }
  }
`
