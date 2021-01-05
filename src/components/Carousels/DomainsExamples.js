import React from "react";
import { CarouselStyled } from "./DomainsExamples.styled.js";

import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider, Image } from "pure-react-carousel";

import prcStyles from "pure-react-carousel/dist/react-carousel.es.css";
import { faAngleRight as faAngleRightSolid } from "@fortawesome/pro-regular-svg-icons/faAngleRight";
import { faAngleLeft as faAngleLeftSolid } from "@fortawesome/pro-regular-svg-icons/faAngleLeft";
import { faAngleLeft } from "@fortawesome/pro-light-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/pro-light-svg-icons/faAngleRight";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";

let CompareSlideIndex = 0;
const CompareSlide = function ({ domain }) {
  return (
    <Slide index={CompareSlideIndex++}>
      <div className="top browser">
        <div className="mock-title ours">
          <u>
            <span>"</span>
            <b>{domain}</b>
            <span>" is not available...</span>
          </u>
        </div>
        {/*{!!show_toggle && <Image src={"/examples/n_ours/" + show_toggle + ".png"} />}*/}
        <Image src={"/examples/n_ours/" + domain + ".png"} className="ours" />
      </div>
      {/*<div className="bottom-compare-to">Compare to:</div>*/}
      {/*<div className="bottom browser">*/}
      {/*  <div className="mock-browser domainsbot">*/}
      {/*    <u>*/}
      {/*      <b>domainsbot.com</b>*/}
      {/*      <span>/search/{domain}</span>*/}
      {/*    </u>*/}
      {/*  </div>*/}
      {/*  <Image src={"/examples/n_domainsbot/" + domain + ".png"} className="domainsbot" />*/}
      {/*</div>*/}
    </Slide>
  );
};

class DomainsExamples extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Slides: null,
      isMounted: false
    };
  }
  componentDidMount() {
    this.setState({
      isMounted: true,
      Slides: [
        <CompareSlide domain="helloworld.com" key="helloworld.com" />,
        <CompareSlide domain="pizza.party" key="pizza.party" />,
        <CompareSlide domain="idea.co" key="idea.co" />,
        <CompareSlide domain="getaway.com" key="getaway.com" />,
        <CompareSlide domain="cbdtonic.com" key="cbdtonic.com" />
      ]
    });
    setTimeout(() => {
      if (!this.state.isMounted) return;
      this.setState({
        Slides: [
          <CompareSlide domain="helloworld.com" />,
          <CompareSlide domain="pizza.party" />,
          <CompareSlide domain="idea.co" />,
          <CompareSlide domain="getaway.com" />,
          <CompareSlide domain="cbdtonic.com" />,
          <CompareSlide domain="doyogaonline.com" />,
          <CompareSlide domain="eatin.com" />,
          <CompareSlide domain="covidnews.com" />,
          <CompareSlide domain="friendfinder.com" />,
          <CompareSlide domain="getfoodnow.com" />,
          <CompareSlide domain="example.com" />,
          <CompareSlide domain="fitness.com" />,
          <CompareSlide domain="nonsense.com" />,
          <CompareSlide domain="onehundred.com" />,
          <CompareSlide domain="simplesolutions.com" />,
          <CompareSlide domain="moneymatters.com" />,
          <CompareSlide domain="whatever.com" />,
          <CompareSlide domain="bubbagump.com" />,
          <CompareSlide domain="curryhouse.com" />
        ]
      });
    }, 5000);
  }
  componentWillUnmount() {
    if (this.state.isMounted) {
      this.setState({
        isMounted: false
      });
    }
  }
  render() {
    if (!this.state.Slides) return null;
    return (
      <CarouselStyled>
        <CarouselProvider
          visibleSlides={Math.round(window.innerWidth / 350)}
          totalSlides={19}
          step={Math.round(window.innerWidth / 350)}
          naturalSlideWidth={900}
          naturalSlideHeight={1800}
        >
          <Slider className={prcStyles.slider}>{this.state.Slides}</Slider>
          <div className="arrows top">
            {/*<ButtonFirst>First</ButtonFirst>*/}
            <ButtonBack className="arrow arrow-left">
              <FA icon={faAngleLeft} className="" />
            </ButtonBack>
            <ButtonNext className="arrow arrow-right">
              <FA icon={faAngleRight} className="" />
            </ButtonNext>
            {/*<ButtonLast>Last</ButtonLast>*/}
            {/*<DotGroup dotNumbers />*/}
          </div>
          <div className="links">
            {/*<ButtonFirst>First</ButtonFirst>*/}
            <ButtonBack className="link link-left">
              <FA icon={faAngleLeftSolid} className="x85" />
              <FA icon={faAngleLeftSolid} className="x85" /> Previous slide
            </ButtonBack>
            <ButtonNext className="link link-right">
              More examples <FA icon={faAngleRightSolid} className="x85" />
              <FA icon={faAngleRightSolid} className="x85" />
            </ButtonNext>
            {/*<ButtonLast>Last</ButtonLast>*/}
            {/*<DotGroup dotNumbers />*/}
          </div>
        </CarouselProvider>
      </CarouselStyled>
    );
  }
}
export default DomainsExamples;
