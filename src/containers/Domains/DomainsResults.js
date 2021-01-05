import React, { useState } from "react";
import { DomainsResultsStyled } from "./DomainsResults.styled";
import Link from "next/link";
import Tlds from "./Tlds";
import { ShowLinkStyled, ColorsStyled, _, __, ___ } from "./Domains.styled";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import Search from "../../components/Search";
import { faDollarSign } from "@fortawesome/pro-regular-svg-icons/faDollarSign";
import { faCaretDown } from "@fortawesome/pro-solid-svg-icons/faCaretDown";
import { faTimes } from "@fortawesome/pro-regular-svg-icons/faTimes";
import { faCode } from "@fortawesome/pro-regular-svg-icons/faCode";
// import { faArrowLeft } from "@fortawesome/pro-light-svg-icons"
import WordPoss from "../../components/WordPoss";
import OptionsMore from "./WIP";
// import { message } from "antd";
import Doms from "../../components/Doms";
import IconFrown from "src/components/IconFrown";
// import IconSmile from "src/components/IconSmile";
import { Modal } from "antd";

function get_ss(key, default_value) {
  if (typeof window !== "object") return default_value;
  let ss_value = window.sessionStorage.getItem(key);
  // console.log('got from ss:', key, ss_value);
  return ss_value ? JSON.parse(ss_value) : default_value;
}

function set_ss(key, value) {
  if (typeof window === "object") {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }
}

const DomainsResults = function (props) {
  let [showWhoisModal, set_showWhoisModal] = useState(false);
  /*
   * Welcome
   */
  // if (!get_ss("welcomed")) {
  //   message.warn(
  //     <span className="color-medium" style={{ verticalAlign: "-0.125rem" }}>
  //       <b className="nowrap">
  //         &nbsp;Welcome to our <span className="color-attention">beta</span> preview! &thinsp;
  //       </b>
  //       <span className="nowrap">You are one of the first to see this&nbsp;</span>
  //       <b className="nowrap">proof of concept</b>.
  //     </span>,
  //     10
  //   );
  //   set_ss("welcomed", true);
  // }

  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that;
  /*
   * View variables:
   */
  // for results:
  let {
    ui,
    domains_availability,
    input_str,
    input_tld,
    input_spellchecked,
    input_is_name,
    input_is_brand,
    domains_suggested,
    domains_generic,
    domains_info,
    tlds_checked,
    input_words_arr
  } = that.props;
  tlds_checked = Object.keys(tlds_checked);
  input_str = input_str.toLowerCase();
  let cue = [];
  let OriginalMessage = null;
  let original_domain = input_str.replace(/ /g, "") + "." + input_tld;
  let original_code = domains_availability[original_domain] || 0;
  let original_info = domains_info[original_domain];
  let original_expiry = (original_info && original_info.expiry) || "";
  let original_whois = (original_info && original_info.whois) || "";
  /*
   * message about availability
   */
  if (original_code === 0) {
    OriginalMessage = <span key="avai">Checking availability...</span>;
  } else if (original_code === 8) {
    cue.push(
      <span key="avai">
        We own "<_ />
        <b>{original_domain}</b>
        <_ />
        ".
      </span>
    );
  } else if (original_code < 2) {
    OriginalMessage = (
      <span key="avai">
        {!original_expiry && (
          <>
            <IconFrown />
            <_ />
          </>
        )}
        <a href={"http://" + original_domain.replace(/ /g, "")} target="_blank">
          {original_domain}
        </a>
        <_ /> is not available
        {!!original_expiry && (
          <>
            ,{" "}
            <i>
              expires on <b style={{ fontSize: "80%", fontWeight: "700" }}>{original_expiry.replace(/-/g, "/")}</b>
            </i>{" "}
            (
            <span
              className="link"
              onClick={() => {
                set_showWhoisModal(true);
              }}
            >
              view WHOIS
            </span>
            )
          </>
        )}
      </span>
    );
  } else if (original_code > 10) {
    OriginalMessage = (
      <span key="avai">
        <span>
          <_ />
          <span
            className="link clickable"
            onClick={() => {
              let form = window.document.getElementById("Domain101Form");
              let input = window.document.getElementById("Domain101Input");
              if (form && input) {
                input.value = original_domain.replace(/ /g, "");
                form.submit();
              }
            }}
          >
            <a href={"http://" + original_domain} target="_blank" className="color-attention">
              {original_domain}
            </a>
            <_ /> is on sale
          </span>{" "}
          for{" "}
          <span
            className="link clickable"
            onClick={() => {
              alert("This feature coming soon!");
            }}
          >
            ${Math.round(original_code).toLocaleString()}
          </span>
        </span>{" "}
        {/*<span className="hide-small">*/}
        {/*  <FA icon={faArrowLeft} className="x70" /> <span className="link clickable" onClick={()=>{alert('This feature coming soon!')}}>Visit the marketplace.</span> Try to negotiate.*/}
        {/*</span>*/}
      </span>
    );
  } else if (original_code > 100000000) {
    OriginalMessage = (
      <span key="avai">
        <span>
          "<_ />
          <a href={"http://" + original_domain} target="_blank">
            {original_domain}
          </a>
          <_ />" will expire soon
        </span>
        , on <b>{(new Date(original_code * 1000) + "").substring(4, 15)}</b>
      </span>
    );
  } else if (original_code === 3 || original_code === 5) {
    OriginalMessage = (
      <span key="avai">
        <span>
          <span>
            <a href={"http://" + original_domain} target="_blank">
              {original_domain}
            </a>{" "}
            is premium,{" "}
          </span>
          sold by the registry
          <span className="hide-small">
            {" "}
            (
            <a href={"http://" + original_domain} target="_blank">
              check the price
            </a>
            )
          </span>{" "}
        </span>
      </span>
    );
  } else if (original_code === 4) {
    OriginalMessage = (
      <span key="avai">
        <span>
          <span>
            <a href={"http://" + original_domain} target="_blank">
              {original_domain}
            </a>{" "}
            is for sale{" "}
          </span>
          in an aftermarket like{" "}
          <a href={"https://sedo.com/search/?keyword=" + original_domain} target="_blank">
            Sedo
          </a>
          &thinsp;/&thinsp;
          <a href={"https://www.afternic.com/search?k=" + original_domain} target="_blank">
            Afternic
          </a>
          &thinsp;/&thinsp;
          <a href={"https://dan.com/search?&terms=" + original_domain} target="_blank">
            Dan.com
          </a>
        </span>
      </span>
    );
  } else if (original_code >= 2) {
    OriginalMessage = (
      <span key="avai">
        <b style={{ margin: "0 0.1rem" }}>
          <span
            className="link"
            onClick={() => {
              window.open101Domain(original_domain);
            }}
          >
            {original_domain}
          </span>
        </b>{" "}
        is available!
      </span>
    );
  }

  /*
   * message about spell check
   */
  if (input_spellchecked && input_spellchecked.replace(/ /g, "") !== input_str.replace(/ /g, "")) {
    cue.push(
      <div key="spellchecked" className="spellchecked">
        Also showing suggestions for "
        <b>
          {input_spellchecked.split(" ").map((str, si) => (
            <span key={si}>
              {str}
              <__ />
            </span>
          ))}
          .{input_tld}
        </b>
        ".
        {/*<br /> To avoid spell-checking any word or phrase, put it in "quotes".*/}
      </div>
    );
  } else if (input_is_name) {
    cue.push(
      <div key="spellchecked" className="spellchecked">
        <span className="link nowrap" onClick={that.openContact}>
          Did you mention a person's name?
        </span>{" "}
        We're still improving handling of non-dictionary words.
      </div>
    );
  } else if (input_is_brand) {
    cue.push(
      <div key="spellchecked" className="spellchecked">
        <span className="link nowrap" onClick={that.openContact}>
          Did you mention a brand name?
        </span>{" "}
        We're still improving results for non-dictionary words.
      </div>
    );
  }

  // else if (input_is_tech) {
  //   cue.push(
  //     <div key="spellchecked" className="spellchecked">
  //       <span className="link nowrap" onClick={that.openContact}>
  //         Did you mean to type in a technology term?
  //       </span>{" "}
  //       We're working on auto-categorizing user input.
  //     </div>
  //   )
  // }
  // else if ((input_str.length > 12 && !input_str.includes(" ")) || that.props.input_str_possibly_corrupted) {
  //   cue.push(
  //     <div key="spellchecked" className="spellchecked">
  //       Did we parse the text correctly? Try putting spaces between words.
  //     </div>
  //   )
  // }
  /*
   * show message
   */
  let cue_nav = (
    <ShowLinkStyled className="showThesaurus hide-small">
      <span
        className="link"
        onClick={() => {
          that.props.ui_actions.RX__toggle_key("show_poss");
        }}
      >
        {!!that.props.ui.show_poss ? (
          <>
            <FA icon={faTimes} className="toggleNLPThesaurus faTimes color-accent x145" />
            &nbsp;Hide thesaurus
          </>
        ) : (
          <>
            Thesaurus&thinsp;
            <FA icon={faCaretDown} className="toggleNLPThesaurus faCaret color-accent" />
          </>
        )}
      </span>
      &thinsp;&thinsp;&thinsp;
      <span
        className="link"
        onClick={() => {
          that.props.ui_actions.RX__toggle_key("show_wip");
        }}
      >
        {!!that.props.ui.show_wip ? (
          <>
            <FA icon={faTimes} className="toggleNLPThesaurus faTimes color-accent x145" />
            &nbsp;Hide wip
          </>
        ) : (
          <>
            WIP&thinsp;
            <FA icon={faCaretDown} className="faCaret color-accent" />
          </>
        )}
      </span>
    </ShowLinkStyled>
  );

  return (
    <DomainsResultsStyled>
      {/*<div className="hide-small content center">*/}
      {/*  <p>*/}
      {/*    <div className="absolute-right color-accent">*/}
      {/*      <FA icon={faTimes} className="x145" />*/}
      {/*    </div>*/}
      {/*    Welcome to our beta release! Please <Link href="/contact">let us know what you think</Link>.&nbsp;*/}
      {/*    <span className="show-large">Thank you.</span>*/}
      {/*  </p>*/}
      {/*</div>*/}
      <Search
        {...that.props}
        className={"Search DomainsResults"}
        domains={true}
        placeholder={"enter two or three words"}
        title=""
        title_nav={
          <span className="hide-small">
            <Link href="/api">
              <a>
                <span>use our API &thinsp;</span>
                <FA icon={faCode} className="x115" />
                <___ />
              </a>
            </Link>
          </span>
        }
        cue={cue}
        cue_nav={cue_nav}
      />

      {/*
       * POSS content, below Search form
       */}
      {!!that.props.ui.show_poss && <WordPoss {...that.props} />}

      {/*
       * Results
       */}
      <div className="container">
        {/*
         * Options opened
         */}
        <OptionsMore that={that} />

        {/*
         * Suggestions + TLDs + WIP
         */}
        <ColorsStyled
          className={"content results " + (!that.state.gotAvailability ? " gettingAvailability" : " gotAvailability")}
        >
          {/*
           * Suggestions
           */}
          <div className="flex">
            <Doms
              OriginalMessage={OriginalMessage}
              domains_generic={domains_generic}
              domains_suggested={domains_suggested}
              domains_availability={domains_availability}
              ui={ui}
              input_str={input_str}
              input_tld={input_tld}
              input_spellchecked={input_spellchecked}
              tlds_checked={tlds_checked}
              input_words_arr={input_words_arr}
            />
            <Tlds that={that} />
          </div>
        </ColorsStyled>
      </div>

      {/*
       * WHOIS
       */}
      <Modal
        visible={showWhoisModal}
        onOk={() => {
          set_showWhoisModal(false);
        }}
        onCancel={() => {
          set_showWhoisModal(false);
        }}
      >
        <pre>{original_whois}</pre>
      </Modal>
    </DomainsResultsStyled>
  );
};

export default DomainsResults;
