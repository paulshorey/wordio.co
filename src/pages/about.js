import React from "react"
import App from "../components/App"
import Footer from "../components/Footer"
import About from "src/containers/About"

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={"About us"}>
        <About />
        <Footer />
      </App>
    )
  }
}

export default RootIndex
