import React from "react";
import { CarouselStyled } from "./AboutUs.styled.js";
import ImageDiv from "./ImageDiv";

import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider } from "pure-react-carousel";

import prcStyles from "pure-react-carousel/dist/react-carousel.es.css";
import { faAngleLeft } from "@fortawesome/pro-regular-svg-icons/faAngleLeft";
import { faAngleRight } from "@fortawesome/pro-regular-svg-icons/faAngleRight";
import { FontAwesomeIcon as FA } from "@fortawesome/react-fontawesome";

const AboutUs = () => {
  if (typeof window !== "object") return null;
  return (
    <CarouselStyled>
      <CarouselProvider
        visibleSlides={Math.round(window.innerWidth / 300)}
        totalSlides={7}
        step={Math.round(window.innerWidth / 300)}
        naturalSlideWidth={600}
        naturalSlideHeight={600}
      >
        <Slider className={prcStyles.slider}>
          <Slide index={5}>
            <ImageDiv src="/photos/aboutus.jpg" />
          </Slide>
          <Slide index={0}>
            <ImageDiv src="/photos/desk-paul.jpg" />
          </Slide>
          <Slide index={1}>
            <ImageDiv src="/photos/desk-samira.jpg" />
          </Slide>
          <Slide index={2}>
            <ImageDiv src="/photos/city-samira-paul.jpg" />
          </Slide>
          <Slide index={4}>
            <ImageDiv src="/photos/aboutus-utah-road.jpg" />
          </Slide>
          <Slide index={3}>
            <ImageDiv src="/photos/about-paul-rocks.jpg" />
          </Slide>
        </Slider>
        <div className="arrows">
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
        {/*<div className="links">*/}
        {/*  /!*<ButtonFirst>First</ButtonFirst>*!/*/}
        {/*  <ButtonBack className="link link-left">*/}
        {/*    <FA icon={faAngleLeftSolid} className="x85" /> Previous*/}
        {/*  </ButtonBack>*/}
        {/*  <ButtonNext className="link link-right">*/}
        {/*    Next <b>(fun photos!)</b> <FA icon={faAngleRightSolid} className="x85" />*/}
        {/*    <FA icon={faAngleRightSolid} className="x85" />*/}
        {/*  </ButtonNext>*/}
        {/*  /!*<ButtonLast>Last</ButtonLast>*!/*/}
        {/*  /!*<DotGroup dotNumbers />*!/*/}
        {/*</div>*/}
      </CarouselProvider>
    </CarouselStyled>
  );
};
export default AboutUs;
