import React from "react"
import App from "../components/App"
import About from "src/containers/About"
import Footer from "../components/Footer"

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={"Contact us"}>
        <About open_contact={true} />
        <Footer />
      </App>
    )
  }
}

export default RootIndex
