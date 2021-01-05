import Link from "next/link";
// import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
// import { faBolt } from "@fortawesome/pro-solid-svg-icons/faBolt";
// import { _ } from "../containers/Domains/Domains.styled";
import React from "react";
import { StyledFooter } from "./Footer.styled.js";

export default () => (
  <StyledFooter>
    <div className="footerCopyright">
      <p className="content">
        Built with ❤️&nbsp; by{" "}
        <Link href="/about" className="color-accent">
          <a>Paul + Samira</a>
        </Link>
        . All rights reserved. By using this site, you agree not to programmatically collect our content. Thanks a lot
        for visiting!
      </p>
      {/*<p className="content">*/}
      {/*  Get this same <Link href="/api"><a>data, results, and algorithms</a></Link> for your site |{" "}*/}
      {/*  <Link href="/api"><a>this API is now available</a></Link> | <Link href="/contact"><a>Contact us</a></Link> | Text analysis{" "}*/}
      {/*  <FA icon={faBolt} className="faBolt" /> by:{" "}*/}
      {/*  <a href="https://wordio.co" target="_blank">*/}
      {/*    wordio*/}
      {/*    <_ />*/}
      {/*    .<_ />*/}
      {/*    co*/}
      {/*  </a>*/}
      {/*</p>*/}
    </div>
  </StyledFooter>
);
