import React from "react"
import App from "../components/App"
import Domains from "src/containers/Domains"
import Footer from "../components/Footer"

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={'Domain suggestions'}>
        <Domains />
        <Footer />
      </App>
    )
  }
}

export default RootIndex
