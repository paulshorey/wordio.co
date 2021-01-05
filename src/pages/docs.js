import React from "react"
import App from "../components/App"
import Header from "../components/Header"
import { withRouter } from 'next/router'

const iframeStyle = {
  border: "none",
  height: "calc(100vh - 2.5rem)"
}

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={"Contact us"}>
        {/*
         * Header
         */}
        <Header standalone={true} wide={true} hidebeta={true} />

        {/*
         * Page
         */}
        <iframe
          xsrc="http://localhost:4567"
          src="https://nlp.studio"
          width="100%"
          height="1000px"
          style={iframeStyle}
        />
      </App>
    )
  }
}

export default withRouter(RootIndex)
