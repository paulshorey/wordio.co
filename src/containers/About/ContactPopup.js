import React from "react"
import { ContactPopup } from "./ContactPopup.styled"
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/pro-light-svg-icons"
import * as contact_actions from "src/redux/actions/api/contact"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"

class AboutPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      contact_email: "",
      contact_name: "",
      contact_text: ""
    }
  }
  saveContact = (e) => {
    e.preventDefault()
    this.props.contact_actions.RX__contact({
      email: this.state.contact_email,
      name: this.state.contact_name,
      text: this.state.contact_text
    })
  }
  render() {
    return (
      <ContactPopup className={this.props.show ? "active" : "hidden"}>
        <div className="overlay" onClick={this.props.onClose} />
        <div className="popup_container">
          <div className="popup">
            <p>
              Let's set up a time to chat. We'd like to show you a demo of our data and capabilities. <br />
              Please feel free to email Paul Shorey:{" "}
              <b>
                <a href="mailto:paul@nlp.studio">paul@besta.domains</a>
              </b>
              ,{" "}
              <span className="nowrap">
                or text{" "}
                <b>
                  <a href="tel:13857706789">+1.385.770.6789</a>
                </b>
              </span>
              <br />
              <br />
            </p>
            {/*<p>*/}
            {/*  or call:{" "}*/}
            {/*  <b>*/}
            {/*    <a href="tel:13857706789">+1.385.770.6789</a>*/}
            {/*  </b>*/}
            {/*</p>*/}
            <form onSubmit={this.saveContact}>
              <h3>We would really appreciate any feedback:</h3>
              <div className="formContent">
                <fieldset>
                  <input
                    type="text"
                    name="email"
                    placeholder="Your email..."
                    value={this.state.contact_email}
                    onChange={(event) => {
                      this.setState({
                        contact_email: event.target.value
                      })
                    }}
                  />
                </fieldset>
                <fieldset>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name..."
                    value={this.state.contact_name}
                    onChange={(event) => {
                      this.setState({
                        contact_name: event.target.value
                      })
                    }}
                  />
                </fieldset>
                <fieldset>
                  <textarea
                    name="text"
                    placeholder="Your message..."
                    value={this.state.contact_text}
                    onChange={(event) => {
                      this.setState({
                        contact_text: event.target.value
                      })
                    }}
                  ></textarea>
                </fieldset>
                <button className="g-recaptcha" type="submit">
                  <img className="svg" alt="send" src="/icons/send-white.svg" />
                  <span> Send</span>
                </button>{" "}
                {/*<span className="color-medium">Thank you!</span>*/}
              </div>
            </form>

            <form onSubmit={this.saveContact}>
              <h3>Get infrequent emails about new products and features:</h3>
              <div className="formContent">
                <fieldset className="flex">
                  <input
                    type="text"
                    name="email"
                    placeholder="Your email..."
                    value={this.state.contact_email}
                    onChange={(event) => {
                      this.setState({
                        contact_email: event.target.value
                      })
                    }}
                  />
                  <button className="g-recaptcha" type="submit">
                    S@ve
                  </button>
                </fieldset>
              </div>
            </form>
            <div className="x" onClick={this.props.onClose}>
              <FA icon={faTimes} className="faTimes" />
            </div>
          </div>
        </div>
      </ContactPopup>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contact_actions: bindActionCreators(contact_actions, dispatch)
  }
}

const mapStateToProps = function (state) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AboutPage)
