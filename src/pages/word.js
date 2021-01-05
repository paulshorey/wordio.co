import React from "react"
import App from "../components/App"
import Word from "src/containers/Word"
import Footer from "../components/Footer"

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={'Thesaurus'}>
        <Word />
        <Footer />
      </App>
    )
  }
}

export default RootIndex
