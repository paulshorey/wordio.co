import styled from "styled-components"

export const ContactPopup = styled.div`
  display: none;
  z-index: 1000;
  &.active {
    display: block;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
  }
  .popup_container {
    position: fixed;
    top: 0;
    @media (max-width: 799px) {
      top: 0;
    }
    left: 0;
    width: 100%;
    height: 95vh;
    padding: 3.33vh 6.66vw;
    margin: auto 0;
    pointer-events: none;
  }
  .x {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
    font-size: 2.2rem;
    width: 2.25rem;
  }

  /*
 * CONTACT FORMS
 */
  .popup {
    pointer-events: all;
    position: relative;
    border-radius: 2px;
    box-shadow: 0 1px 10px rgba(0, 0, 0, 0.8);
    background: hsl(210, 96%, 91%);
    max-width: 50rem;
    margin: 0 auto;
    padding: 0.25rem 0 1rem 2rem;
    color: #333;
    text-shadow: none;
    overflow: auto;
    max-height: 97.5vh;
    > p:first-child {
      margin: 1.5rem 0 0 0;
    }
    form {
      overflow: auto;
      padding: 0;
      margin: 0.5rem auto 2rem;
      h3 {
        margin-top: 1rem;
        font-size: 1.25rem;
        font-family: "Quicksand", system-ui, sans-serif;
        font-weight: 600;
      }
      .formContent {
        padding: 0 0 1rem;

        fieldset {
          padding: 0 0 0.5rem;
          margin: 0;
          border: none;
          &.flex {
            input {
              display: inline-block;
              width: auto;
              min-width: 67%;
            }
            button {
              display: inline-block;
            }
          }
        }
        textarea,
        input {
          padding: 5px 10px;
          margin: 0 10px 0 0;
          border: solid 1px #ccc;
          border-radius: 3px;
        }
        textarea,
        input[type="text"] {
          width: calc(100% - 3rem);
        }
        textarea {
          min-height: 30vh;
        }
      }
    }
    button {
      background: var(--color-link);
      padding: 5px 14px 5px 15px;
      box-shadow: 1px 1px 0 #999;
      border-radius: 4px;
      border: none;
      color: white;
      font-size: 1rem;
      display: inline-flex;
      align-items: center;
      font-family: "Quicksand", system-ui, sans-serif;
      font-weight: 600;
      cursor: pointer;
      margin: 0 1rem 0 1px;
      * {
        vertical-align: middle;
      }
      img.svg {
        height: 1rem;
        margin-right: 0.5rem;
        fill: white;
      }
    }
    .response {
      color: #999;
    }
    a {
      color: var(--color-link);
    }
  }

  /*
   * ETC
   */

  .error {
    color: red;
  }
  .success {
    color: green;
  }

  .contact-bottom-right {
    display: flex;
    align-items: center;
    * {
      vertical-align: middle;
    }
    img.svg {
      height: 1rem;
      margin-right: 0.5rem;
      fill: white;
    }
  }

  .positionHigher {
    position: relative;
    top: -1rem;
  }
`
