import React from "react"
import App from "../components/App"
import Domains from "src/containers/Domains"

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={"Domain suggestions"}>
        <Domains />
      </App>
    )
  }
}

export default RootIndex
