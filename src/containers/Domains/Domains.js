import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as ui_actions from "src/redux/actions/ui";
import * as io_actions from "src/redux/actions/io";
import * as contact_actions from "src/redux/actions/api/contact";
import DomainsResults from "./DomainsResults";
import DomainsHome from "./DomainsHome";
import ContactPopup from "src/containers/About/ContactPopup";

class Domains extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tldAdd: "",
      showWip: false,
      showOptions: false,
      popupActive: false,
      lastRequestTime: 0
    };
    /*
     * Fix url
     */
    // if (!props.router.query.search) {
    //   // remove input string from url
    //   props.io_actions.RX__clear_inputs();
    // }
  }

  openContact = () => {
    try {
      window.document.querySelector(".eapps-form-floating-button").click();
    } catch (e) {
      window.alert("Please contact: paul@besta.domains   +1.385.770.6789");
    }
  };

  componentDidMount() {
    /*
     * Show admin tool
     */
    // if (this.props.router.asPath.includes("wordposs")) {
    //   this.props.ui_actions.RX__toggle_poss();
    // }
    /*
     * Get suggestions
     */
    // this.props.io_actions.RX__search_suggestions()
    /*
     * Location hash
     */
    // setTimeout(() => {
    //   if (this.props.router.location.hash && typeof document !== "undefined") {
    //     let el = document.querySelector('[name="' + this.props.router.location.hash.substr(1) + '"]');
    //     if (el) {
    //       el.scrollIntoView({
    //         behavior: "smooth"
    //       });
    //     }
    //   }
    // }, 500);
  }

  async componentDidUpdate(prevProps) {
    /*
     * Fix url
     */
    // if (this.props.router.asPath.includes("#")) {
    //   // remove hash
    //   let pushTo = this.props.router.asPath.substring(0, this.props.router.asPath.indexOf("#"));
    //   if (pushTo) {
    //     this.props.router.push(pushTo);
    //   }
    // }
    /*
     * Get suggestions
     */
    if (this.props.search_now && this.props.search_now !== prevProps.search_now) {
      this.props.io_actions.RX__search_suggestions();
    }
    /*
     * Location hash
     */
    // if (
    //   typeof document !== "undefined" &&
    //   this.props.router.location.hash &&
    //   this.props.router.location.hash.length > 3 &&
    //   this.props.router.location.hash !== prevProps.router.location.hash
    // ) {
    //   let el = document.querySelector('[name="' + this.props.router.location.hash.substr(1) + '"]');
    //   if (el) {
    //     el.scrollIntoView({
    //       behavior: "smooth"
    //     });
    //   }
    // }
  }

  toggle_view_option = (key, force) => {
    this.props.ui_actions.RX__toggle_key(key, force);
  };
  toggle_suggestions_option = (key, force) => {
    this.props.io_actions.RX__toggle_suggestions_option(key, force);
  };
  toggleWip = () => {
    this.setState({
      showWip: !this.state.showWip
    });
  };
  toggleOptions = () => {
    // let showWip = this.state.showOptions ? false : this.state.showWip
    // temporarily, always show WIP when showing options...
    let showWip = !this.state.showOptions;
    // show options
    this.setState({
      // toggle options UI
      showOptions: !this.state.showOptions,
      // if options UI is toggled OFF, then also hide the WIP UI
      showWip: showWip
    });
  };
  tld_user = (tld) => {
    this.props.io_actions.RX__tld_add(tld, "user");
  };
  tld_check = (tld) => {
    this.props.io_actions.RX__tld_add(tld, "checked");
  };
  tld_uncheck = (tld) => {
    this.props.io_actions.RX__tld_add(tld, "unchecked");
  };

  render() {
    // console.log("Domains.js domains_availability", this.props.domains_availability)
    return (
      <>
        {this.props.input_str ? (
          <DomainsResults className="DomainsResults" that={this} />
        ) : (
          <DomainsHome className="DomainsHome" that={this} />
        )}
        {/*
         * Contact popup
         */}
        <ContactPopup
          show={!!this.state.popupActive}
          onClose={() => {
            this.setState({ popupActive: false });
          }}
        />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ui_actions: bindActionCreators(ui_actions, dispatch),
    io_actions: bindActionCreators(io_actions, dispatch),
    contact_actions: bindActionCreators(contact_actions, dispatch)
  };
};

const mapStateToProps = function (state) {
  return {
    // word
    word_chunks: state.output.chunks,
    word_input: state.input.input,
    input_str: state.input.str,
    input_spellchecked: state.input.spellchecked,
    input_tld: state.input.tld || "com",
    search_now: state.input.search_now,
    input_words_arr: state.input.words_arr,
    // ui
    ui: state.ui,
    // suggestions_options
    suggestions_options: state.input.suggestions_options,
    // meta
    input_is_name: state.output.is_name,
    input_is_brand: state.output.is_brand,
    input_is_tech: state.output.is_tech,
    // tlds
    tlds_all: state.output.tlds_all,
    tlds_user: state.output.tlds_user,
    tlds_checked: state.output.tlds_checked,
    tlds_unchecked: state.output.tlds_unchecked,
    tlds_extra: state.output.tlds_extra,
    // suggestions
    domains_info: state.output.domains_info,
    domains_generic: state.output.domains_generic,
    domains_suggested: state.output.domains_suggested,
    domains_availability: state.output.domains_availability,
    com_hacks: state.output.com_hacks,
    word_hacks: state.output.word_hacks,
    phrase_hacks: state.output.phrase_hacks,
    suggestions_phrase_lists: state.output.suggestions_phrase_lists,
    str_possibly_corrupted: state.output.str_possibly_corrupted
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Domains);
