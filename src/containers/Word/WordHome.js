import React from "react";
import Search from "../../components/Search";
import Link from "next/link";
import { StyledHome } from "./WordHome.styled";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/pro-solid-svg-icons/faBolt";

export default function (props) {
  /*
   * User "container" state/props/methods!
   * This "child" component is to simplify container's render() logic.
   */
  let that = props.that;
  let oxfordExample = function () {
    let text = `[
    ["bright","full of light","well lit","well lighted", ...],
    ["light-coloured","light-toned","pale", ...],
    ["easy to lift","not heavy","weighing very little","lightweight", ...],
    ["flimsy","lightweight","insubstantial","thin", ...]
]`;
    return { __html: text };
  };
  /*
   * Variables
   */
  // for content
  let { word_input } = that.props;
  return (
    <>
      <Search
        {...that.props}
        className={!word_input ? "Search Home" : "Search"}
        domains={false}
        title="Find another word for..." // // {[<div key="logo">{NLPThesaurusLogo}</div>, <div key="title">Another word for...</div>]}
        placeholder="..."
        home={true}
        cue={[
          <div key="1">Discover related words, root word, parts of speech, plurals, abbreviations, etc.</div>,
          <div key="2" style={{ marginTop: "0.25rem" }}>
            <FA icon={faBolt} className="color-accent" /> Powers our <Link href="/">domain name generator</Link>.{" "}
            {/*<span key="3" className="nowrap">*/}
            {/*  Built by{" "}*/}
            {/*  <a href="https://paulshorey.com" target="_blank" className="nowrap">*/}
            {/*    Paul Shorey*/}
            {/*  </a>*/}
            {/*  &nbsp;*/}
            {/*</span>*/}
          </div>
          // <span key="2">
          //   Built for <span className="nowrap">AI applications</span>.&nbsp;
          //   <span key="3" className="nowrap">
          //     <FA icon={faBolt} className="color-accent" /> Powers our{" "}
          //     <a href="https://besta.domains" target="_blank">
          //       domain name generator
          //     </a>
          //     .
          //   </span>
          // </span>
        ]}
      />
      <StyledHome>
        {/*<article className="exploreAPI">test test</article>*/}
        <article className="content">
          <section>
            <h3 className="color-attention">
              Try it ☝️. More entries than any other thesaurus. With sentiment-analysis!
            </h3>
            <p>
              Try 'aloha' or 'appendectomy'. 'Zig' or 'zag' . Even short phrases like 'water under the bridge' or 'in a
              while' .
            </p>
            <div className="text">
              <p>
                <b>Parts of speech</b> (nouns, verbs, interjections, pronouns, etc.), ordered by relevance.{" "}
                <b>Root word extraction.</b> Plural/singular. Abbreviations/acronyms. <b>Sentiment score</b> (👍 Ok/good
                or 👎 negative). Related domain name TLDs. Etc.
              </p>
            </div>
          </section>

          <section>
            <h3 className="color-attention">Word breaking, tokenization, lemmatization. Even without spaces!</h3>
            <p>
              <i>We can extract meaning from a string with no spaces! Even BERT does not do this.</i>
            </p>
            <div className="text">
              <p>
                <i>Ex1: "</i>
                <b>thisisanexample</b>
                <i>" returns </i>"<b>this</b> <>is</> <>an</> <b>example</b>(noun)".
              </p>
              <p>
                <i>Ex2: "</i>
                <b>atotaleclipseofthesky</b>
                <i>" returns </i>"<>a</> <b>total</b>(adj) <b>eclipse</b>(noun) <>of</> <>the</> <b>sky</b>(noun)" + "
                <b>total eclipse</b>(noun)"
              </p>
              <p>
                <i>Ex3: "</i>
                <b>unitedstates</b>
                <i>" returns </i>"<b>united</b>(adj) <b>states</b>(noun)" + "<b>united states</b>(noun)"
              </p>
            </div>
          </section>

          <section>
            <h3 className="color-attention">API coming soon...</h3>
            <div className="text">
              <p>
                Until then, try our <Link href="/">domain suggestions</Link>. Our API can analyze your input text (with
                or without spaces), generate domain name phrases, and accurately match related TLDs.
              </p>
            </div>
          </section>

          <p>&nbsp;</p>
        </article>
      </StyledHome>
    </>
  );
}
