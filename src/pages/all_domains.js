import React from "react"
import App from "../components/App"
import AllDomains from "src/containers/Admin/AllDomains"

class RootIndex extends React.Component {
  render() {
    return (
      <App>
        <AllDomains />
      </App>
    )
  }
}

export default RootIndex
