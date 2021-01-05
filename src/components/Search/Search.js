/*
 * This component manages two variables: ${str} and ${tld}.
 *
 * LOCAL STATE (user input)    temporary - when changes, do nothing
 * GLOBAL STATE                read only - if changes, do nothing
 * URL PARAMS                  when changes, sync to local/global
 * USER SUBMIT OR SELECT       sync local state to global/url
 */
import React, { createRef } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ui_actions from "src/redux/actions/ui";
import * as io_actions from "src/redux/actions/io";
import { Button, Input } from "antd";
import { Styled } from "./Search.styled";
import InputTld from "src/components/Search/InputTld";
// import WordPoss from "../WordPoss"
import PropTypes from "prop-types";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/pro-solid-svg-icons/faSearch";
import Header from "../Header";
import Demo from "./Demo";
// import { withRouter } from "next/router";
// import { faAngleDown } from "@fortawesome/pro-solid-svg-icons"

/*
 * CAPTCHA:
 *
 * in production, wait for captcha success, or abort fetching data
 * in development, query data immediately
 */
// import { loadReCaptcha as loadRecaptchaV3, ReCaptcha as RecaptchaV3 } from "react-recaptcha-v3"
const PRODUCTION = process.env.NODE_ENV !== "development";
// import RecaptchaV2 from "react-google-invisible-recaptcha"
const UES_CAPTCHA_IN_DEV = false;
const USE_CAPTCHA = UES_CAPTCHA_IN_DEV || PRODUCTION; // use captcha in development?
// const CAPTCHA2_KEY = "6LeQt-MUAAAAAFHZGwmJnd58aStK2xF-6f8MBtm3"
// const CAPTCHA3_KEY = "6LfSN-MUAAAAAOxMUojSlBxkicjSeX1YLW8ds8C1"

/*
 * LIFECYCLE:
 *
 * constructor() --- page loaded, parse state from url or redux initial state
 * componentDidMount() --- :focus input field, fetch data
 * componentDidUpdate() --- respond to URL change (back button, navigate to home)
 * s ave_state()
 * --- validates 2 arguments (word, tld), sets default, parses tld from word,
 * --- then calls captcha_challenge()
 * captcha_challenge()
 * --- in production, waits for captcha success
 * --- then calls verifyReCaptchaV2()
 * verifyReCaptchaV2()
 * --- syncs local state to global/url
 */
class Search extends React.Component {
  constructor(props) {
    super(props);
    /*
     * default values
     */
    let url_obj = {}; //props.router.query;
    this.state = {
      str: (url_obj.str || props.input_str || "").trim(),
      tld:
        url_obj.tld || props.input_tld || Object.keys(props.tlds_user)[0] || Object.keys(props.tlds_checked)[0] || "",
      captcha2_token: "", // to compare old/new
      captcha3_token: "" // will be setState first, then used on click
      // placeholder: "...",
      // placeholder_n: 1
    };
    /*
     * dom manipulation
     */
    this.Input_ref = createRef();
    this.Search_ref = createRef();
  }

  focusInput() {
    if (this.Input_ref.current && typeof window === "object" && window.innerWidth > 700) {
      this.Input_ref.current.focus();
    }
  }
  blurInput() {
    if (this.Input_ref.current) {
      this.Input_ref.current.blur();
    }
  }

  componentWillUnmount() {
    clearInterval(this.placeholderInterval);
  }

  componentDidMount() {
    /*
     * placeholder logic
     */
    // if (this.props.placeholder) {
    //   if (Array.isArray(this.props.placeholder)) {
    //     // this.state.placeholder = this.props.placeholder[(this.props.placeholder.length % this.state.placeholder_n) - 1]
    //     this.placeholderInterval = setInterval(() => {
    //       let p_n = this.state.placeholder_n++
    //       this.setState({
    //         placeholder: this.props.placeholder[(this.props.placeholder.length % p_n) - 1],
    //         placeholder_n: p_n
    //       })
    //     }, 1000)
    //   } else {
    //     this.state.placeholder = this.props.placeholder
    //   }
    // }
    /*
     * Auto fetch content on page load
     * NO - because switching from Home to Results, the component DidMount again
     */
    // this.captcha_challenge()
    /*
     * Must pre-load for RecaptchaV3
     */
    // loadRecaptchaV3(CAPTCHA3_KEY)
    /*
     * :focus this input field from outside this componentpm
     */
    this.focusInput();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /*
     * reset inputs if visit homepage
     */
    // if (!this.props.router.asPath && prevProps.router.asPath !== this.props.router.asPath) {
    //   this.props.io_actions.RX__clear_inputs();
    // }
    /*
     * url state -> local state
     */
    // if (this.props.router.asPath !== prevProps.router.asPath) {
    //   let url_obj = this.props.router.query;
    //   this.setState({ str: (url_obj.str || "").trim(), tld: url_obj.tld || "" }, this.persist_state);
    // }
    /*
     * remember last captcha
     */
    if (this.props.captcha !== prevProps.captcha) {
      this.setState({ captcha: this.props.captcha });
    }
    /*
     * sync tld
     */
    if (this.props.input_tld !== prevProps.input_tld && this.props.input_tld !== this.state.tld) {
      this.setState({ tld: this.props.input_tld });
    }
    /*
     * sync str
     */
    if (this.props.input_str !== prevProps.input_str && this.props.input_str !== this.state.str) {
      this.setState({ str: this.props.input_str });
    }
  }

  captcha_challenge = () => {
    // console.warn("Search.js captcha_challenge()")
    this.blurInput();
    /*
     * if challenge is successful, captcha.execute() will call this.verifyReCaptchaV2()
     */
    // console.warn("Search.js captcha_challenge()")
    /*
     * no input, stop
     */
    // if (!this.state.str) {
    //   return
    // }
    /*
     * verify
     */
    if (USE_CAPTCHA) {
      //this.props.auth_expires >= Date.now()
      // console.warn("Search.js captcha_challenge() if ( this.props.auth_expires >= Date.now() )")
      /*
       * auth current, not expired - use V3
       */
      this.verifyReCaptchaV3();
    } else {
      /*
       * prevent duplicate captcha (if everything the same)
       * skip captcha in DEVELOPMENT environment
       */
      this.persist_state();
    }
  };

  verifyReCaptchaV3 = () => {
    // console.warn("Search.js verifyReCaptchaV3()")
    /*
     * captcha response
     */
    /*
     * use
     */
    // this.props.io_actions.RX__set_inputs({ captcha3: captcha_response })
    if (typeof window === "object" && typeof grecaptcha !== "undefined" && typeof grecaptcha.ready === "function") {
      grecaptcha.ready(() => {
        // console.log("grecaptcha is ready (()=>")
        grecaptcha
          .execute("6LfSN-MUAAAAAOxMUojSlBxkicjSeX1YLW8ds8C1", { action: "fetchData" })
          .then((captcha_response) => {
            // console.warn("EXECUTED CAPTCHA V3 TOKEN =", captcha_response)
            window.recaptcha3_token = captcha_response;
            this.persist_state(captcha_response, 3);
          });
      });
    }
  };

  // verifyReCaptchaV2 = () => {
  //   /*
  //    * captcha response
  //    */
  //   let captcha_response = ""
  //   if (USE_CAPTCHA) {
  //     captcha_response = this.recaptcha2.getResponse()
  //     this.recaptcha2.reset()
  //   }
  //
  //   /*
  //    * use
  //    */
  //   this.persist_state(captcha_response, 2)
  // }

  /*
   * This is the only place, the single source of truth,
   *    which calls RX__set_inputs()
   */
  persist_state = (captcha_response, captcha_version) => {
    // console.warn("Search.js persist_state()")

    // props from URL, on-load
    let props_inputs = { str: this.props.input_str, tld: this.props.input_tld };
    // console.log("props", props_inputs)
    // parse tld from str
    if (props_inputs.str) {
      let str = props_inputs.str;
      let io = str.indexOf(".");
      if (io !== -1) {
        let tld = str.substr(io + 1);
        if (tld) {
          props_inputs.tld = tld;
        }
        props_inputs.str = str.substr(0, io);
      }
    }

    // state from user input
    let state_inputs = { str: this.state.str, tld: this.state.tld };
    // console.log("state", state_inputs)
    // parse tld from str
    if (state_inputs.str) {
      let str = state_inputs.str;
      let io = str.indexOf(".");
      if (io !== -1) {
        let tld = str.substr(io + 1);
        if (tld) {
          state_inputs.tld = tld;
        }
        state_inputs.str = str.substr(0, io);
      }
    }

    /*
     * what changed
     */
    let inputs = {
      str: state_inputs.str || props_inputs.str,
      tld: state_inputs.tld || props_inputs.tld
    };
    if (captcha_version && captcha_response) {
      inputs["captcha" + captcha_version] = captcha_response;
    }
    // console.log("changed", inputs)

    this.props.io_actions.RX__set_inputs(inputs);

    setTimeout(() => {
      if (this && this.props && this.props.io_actions) {
        this.props.io_actions.RX__search_now();
      }
    }, 100);
  };

  render() {
    let {
      home,
      loading,
      location = {},
      title,
      title_nav,
      placeholder,
      cue,
      cue_nav,
      hideInput,
      domains,
      className = "",
      autofocus,
      ...props
    } = this.props;

    if (!cue) {
      className += " nocue";
    }
    if (!title) {
      className += " notitle";
    }

    return (
      <>
        {/*
         * Header
         */}
        <Header location={location} home={!!home} domains={!!domains} loading={!!loading} />

        {/*
         * Search banner
         */}
        <Styled
          className={"Search " + className}
          onMouseEnter={() => {
            if (autofocus) this.focusInput();
          }}
          onClick={(e) => {
            if (home && e.target && (e.target.tagName === "DIV" || e.target.tagName === "SECTION")) {
              this.focusInput();
            }
          }}
          ref={this.Search_ref}
        >
          {/*
           * Demo/Mockup
           */}
          {/*<Demo location={location} home={!!home} domains={!!domains} />*/}
          <section className="content full">
            {/*
             * Title
             * If mobile, show only last line (last item in array)!
             */}
            {!!title && <h1 className="title">{title || null}</h1>}

            {/*
             * Input Group
             */}
            <div className={"input-group"}>
              {!hideInput ? (
                <Input
                  ref={this.Input_ref}
                  className="Input"
                  placeholder={placeholder || "..."}
                  value={this.state.str}
                  onChange={(event) => {
                    this.setState({
                      str: event.target.value.toLowerCase()
                    });
                  }}
                  onKeyPress={(event) => {
                    // console.warn("Input onKeyPress() ")
                    if (event.key === "Enter") {
                      this.captcha_challenge();
                    }
                  }}
                  onBlur={() => {
                    if (this.props.input_str && !this.state.str) {
                      this.setState({
                        str: this.props.input_str.trim()
                      });
                    }
                  }}
                />
              ) : (
                <span className="input-padding" />
              )}
              {!!domains && (
                <InputTld
                  // style={home && !this.props.focusSelectTld ? { display: "none" } : {}}
                  value={this.state.tld || "com"}
                  placeholder=""
                  handleSelect={(value) => {
                    // console.warn("InputTld handleSelect() ", value)
                    this.setState(
                      {
                        tld: value.toLowerCase()
                      },
                      this.captcha_challenge
                    );
                  }}
                />
              )}
              <Button
                className="Button"
                onClick={() => {
                  // console.warn("Button onClick() ")
                  this.captcha_challenge();
                }}
              >
                <span className="searchText hide-small">search </span>
                <FA icon={faSearch} className="searchIcon faSearch show-small" style={{ transform: "scale(0.85)" }} />
              </Button>
            </div>

            {/*
             * Cue message
             */}
            {!!title_nav ? <span className="title_nav">{title_nav}</span> : null}
            {!!cue_nav ? <span className="cue_nav">{cue_nav}</span> : null}

            {/*
             * Cue message
             */}
            {!!cue && <>{!!cue && <div className="cue">{cue}</div>}</>}
          </section>

          {/*
           * RecaptchaV2
           */}
          {/*{USE_CAPTCHA ? (*/}
          {/*  <>*/}
          {/*    <RecaptchaV2*/}
          {/*      ref={(ref) => (this.recaptcha2 = ref)}*/}
          {/*      sitekey={CAPTCHA2_KEY}*/}
          {/*      onLoaded={() => {}}*/}
          {/*      onResolved={this.verifyReCaptchaV2}*/}
          {/*      onError={(err) => {*/}
          {/*        console.error("Captcha error", err)*/}
          {/*      }}*/}
          {/*      onExpired={(err) => {*/}
          {/*        console.error("Captcha expired", err)*/}
          {/*      }}*/}
          {/*    />*/}
          {/*    <RecaptchaV3*/}
          {/*      ref={(ref) => (this.recaptcha3 = ref)}*/}
          {/*      sitekey={CAPTCHA3_KEY}*/}
          {/*      action="idk"*/}
          {/*      verifyCallback={this.verifyReCaptchaV3}*/}
          {/*    />*/}
          {/*  </>*/}
          {/*) : (*/}
          {/*  <RecaptchaV2 sitekey="x" onError={this.verifyReCaptchaV2} onExpired={this.verifyReCaptchaV2} />*/}
          {/*)}*/}
        </Styled>
      </>
    );
  }
}

/*******************************************************************************************************
 * this.props DOCUMENTATION
 *******************************************************************************************************/

const mapDispatchToProps = (dispatch) => {
  return {
    io_actions: bindActionCreators(io_actions, dispatch),
    ui_actions: bindActionCreators(ui_actions, dispatch)
  };
};

const mapStateToProps = function (state) {
  return {
    auth_expires: state.input.auth_expires,
    suggestions_options: state.input.suggestions_options, // bool
    show_poss: state.ui.show_poss, // bool
    input_str: state.input.str, // string
    input_captcha: state.input.captcha, // string
    chunks: state.output.chunks, // array of DB rows, about input_str
    input_tld: state.input.tld, // string
    tlds_user: state.output.tlds_user, // dict of tlds
    tlds_checked: state.output.tlds_checked, // dict of tlds
    focusSelectTld: state.ui.focusSelectTld
  };
};

Search.propTypes = {
  domains: PropTypes.bool, // if true, this component will manage .tld in url (if false, will omit .tld from url)
  location: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
