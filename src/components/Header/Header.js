import React from "react";
import { connect } from "react-redux";
import Link from "next/link";
import {
  StyledHeaderDropdownOverlay,
  StyledHeaderDropdown,
  StyledHeadContainer,
  StyledHeader,
  StyledHead,
  StyledLogoLink,
  StyledHeadUnder,
  StyledToplinks,
  StyledRightHamburger,
  StyledLogoContainer
} from "./Header.styled";
import { Menu } from "antd";
import { faBars } from "@fortawesome/pro-regular-svg-icons/faBars";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { bindActionCreators } from "redux";
import * as io_actions from "../../redux/actions/io";
import * as ui_actions from "../../redux/actions/ui";
import { _ } from "src/containers/Domains/Domains.styled";
import { withRouter } from "next/router";

const PRODUCTION = process.env.NODE_ENV !== "development";
const NEXT_PUBLIC_SELF_PRODUCTION_HOST = "//" + process.env.NEXT_PUBLIC_SELF_PRODUCTION_HOST;
console.log("NEXT_PUBLIC_SELF_PRODUCTION_HOST", NEXT_PUBLIC_SELF_PRODUCTION_HOST);
console.log("process.env.NEXT_PUBLIC_SELF_PRODUCTION_HOST", process.env.NEXT_PUBLIC_SELF_PRODUCTION_HOST);

export const BestaDomainsLogo = ({ home, io_actions } = {}) => (
  <StyledLogoLink>
    <Link
      href="/"
      onClick={() => {
        io_actions.RX__clear_inputs();
        setTimeout(function () {
          if (typeof window === "object") window.scrollTo({ top: 0, behavior: "smooth" });
        }, 300);
      }}
    >
      <a>
        <span className="color-highlight-primary">besta</span>
        <span className="color-xhighlight-secondary">
          .<_ />
          domains
        </span>
        <span className="beta">beta</span>
      </a>
    </Link>
  </StyledLogoLink>
);
export const WordioCoLogo = ({ home, io_actions } = {}) => (
  <StyledLogoLink>
    <a
      href="/#top"
      onClick={(e) => {
        e.preventDefault();
        io_actions.RX__clear_inputs();
        let el = document.querySelector('[name="top"]');
        !!el &&
          el.scrollIntoView({
            behavior: "smooth"
          });
      }}
    >
      <span className="color-white">wordio</span>
      <span className="color-attention">
        .<_ />
        co
      </span>
      <span className="beta">beta</span>
    </a>
  </StyledLogoLink>
);

class AccountMenu extends React.Component {
  render() {
    // view
    return (
      <Menu className={"MenuDropdownHeaderRight"}>
        {/*
         * About
         */}
        <div className="spacer" />
        <Menu.Item>
          <h6>
            <Link href="/about">
              <a>About Us</a>
            </Link>
          </h6>
          <h6>
            <Link href="/contact">
              <a>Contact Us</a>
            </Link>
          </h6>
        </Menu.Item>
        {/*
         * Apps
         */}
        <div className="divider">Apps:</div>
        <Menu.Item>
          <h6>
            <Link href="/">
              <a>Domain Suggestions</a>
            </Link>
          </h6>
        </Menu.Item>
        <Menu.Item>
          <h6>
            <Link href="/word">
              <a>Thesaurus</a>
            </Link>
          </h6>
        </Menu.Item>
        {/*
         * APIs
         */}
        <div className="divider">For registrars:</div>
        <Menu.Item>
          <h6>
            <Link href="/docs">
              <a>API Documentation</a>
            </Link>
          </h6>
        </Menu.Item>
        {/*
         * Admin tools
         */}
        {PRODUCTION ? (
          <>
            <Menu.Item className="small h6">
              <Link href={"/contact"}>
                <a>
                  <b className="color-accent">Demo our admin tools</b>
                </a>
              </Link>
            </Menu.Item>
          </>
        ) : (
          <>
            <div className="divider">Demo our admin tools:</div>
            <Menu.Item className="small h6">
              <Link href={"/edit_word" + (this.props.first_word !== "" ? "?str=" + this.props.first_word : "")}>
                <a>
                  <b className="color-accent">Edit word</b>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item className="small h6">
              <Link
                href={
                  "/edit_domain" +
                  (this.props.input_tld !== "" && this.props.input_tld !== "com" ? "?tld=" + this.props.input_tld : "")
                }
              >
                <a>
                  <b className="color-accent">Edit domain</b>
                </a>
              </Link>
            </Menu.Item>
            <Menu.Item className="small h6">
              <a href={"/all_domains"} target="_blank">
                <b className="color-accent">All domains</b>
              </a>
            </Menu.Item>
            <Menu.Item className="small h6">
              <Link href={"/domain" + "?str=better travel together&wordposs=1"}>
                <a>
                  <b className="color-accent">Domain suggestions</b>
                </a>
              </Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    );
  }
}

class ThisComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showNav: false
    };
  }

  render() {
    let { home, domains, standalone, wide, hidebeta } = this.props;
    let Logo = NEXT_PUBLIC_SELF_PRODUCTION_HOST === "//wordio.co" ? WordioCoLogo : BestaDomainsLogo;

    return (
      <StyledHeadContainer className={standalone ? "wrapInContainer" : ""}>
        {!!home && <StyledHeadUnder />}
        <StyledHead className={"StyledHead " + (home ? " isHome" : "")} style={{ position: !!home ? "fixed" : "" }}>
          {/*
           * Header Bar
           */}
          <StyledHeader className={"StyledHeader content " + (wide ? "verywide" : "")}>
            {/*
             * Logo
             */}
            <StyledLogoContainer className={hidebeta ? " hidebeta" : ""}>
              <a name="top" />
              <h2 className="StyledLogo">{Logo(this.props)}</h2>
            </StyledLogoContainer>

            {/*
             * Links
             */}
            {!!domains && (
              <StyledToplinks className={home ? "home" : ""}>
                <>
                  {/*<a href="#" className="fifth">*/}
                  {/*  demo*/}
                  {/*</a>*/}
                  <a
                    href="#examples"
                    className="fourth"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.io_actions.RX__clear_inputs();
                      setTimeout(function () {
                        let el = document.querySelector('[name="examples"]');
                        !!el &&
                          el.scrollIntoView({
                            behavior: "smooth"
                          });
                      }, 300);
                    }}
                  >
                    examples
                  </a>
                  {/*<a*/}
                  {/*  href="#compare"*/}
                  {/*  className="third"*/}
                  {/*  onClick={(e) => {*/}
                  {/*    e.preventDefault();*/}
                  {/*    this.props.io_actions.RX__clear_inputs();*/}
                  {/*    setTimeout(function () {*/}
                  {/*      let el = document.querySelector('[name="compare"]');*/}
                  {/*      !!el &&*/}
                  {/*        el.scrollIntoView({*/}
                  {/*          behavior: "smooth"*/}
                  {/*        });*/}
                  {/*    }, 300);*/}
                  {/*  }}*/}
                  {/*>*/}
                  {/*  compare*/}
                  {/*</a>*/}
                  <a
                    href="#features"
                    className="second"
                    onClick={(e) => {
                      e.preventDefault();
                      this.props.io_actions.RX__clear_inputs();
                      setTimeout(function () {
                        let el = document.querySelector('[name="features"]');
                        !!el &&
                          el.scrollIntoView({
                            behavior: "smooth"
                          });
                      }, 300);
                    }}
                  >
                    features
                  </a>
                </>
                {/*<Link href="/about" className="first"><a>*/}
                {/*  about us*/}
                {/*</a></Link>*/}
              </StyledToplinks>
            )}

            {/*
             * Hamburger Menu
             */}
            <StyledRightHamburger
              className="StyledRightHamburger"
              onMouseOver={() => {
                this.setState({ showNav: true });
              }}
            >
              <FA icon={faBars} className="faBars" />
            </StyledRightHamburger>
            {/*
             * Top-Right Dropdown Nav Menu
             */}
            <StyledHeaderDropdown className={this.state.showNav ? "visible" : "hidden"}>
              <AccountMenu {...this.props} />
            </StyledHeaderDropdown>
            <StyledHeaderDropdownOverlay
              className={this.state.showNav ? "visible" : "hidden"}
              onMouseOver={() => {
                this.setState({ showNav: false });
              }}
            />
          </StyledHeader>
        </StyledHead>
      </StyledHeadContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    io_actions: bindActionCreators(io_actions, dispatch),
    ui_actions: bindActionCreators(ui_actions, dispatch)
  };
};
const mapStateToProps = function (state) {
  return {
    input_str: state.input.str,
    input_tld: state.input.tld,
    input_first_word: state.input.first_word
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThisComponent));

