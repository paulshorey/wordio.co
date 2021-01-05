import React from "react"
import { ImageDivStyled } from "./AboutUs.styled.js"

import { ImageWithZoom } from "pure-react-carousel"

export default ({ src, alt = "" }) => (
  <ImageDivStyled className="ImageWithZoom">
    <ImageWithZoom alt={alt} src={src} />
  </ImageDivStyled>
)
