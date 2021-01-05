import React from "react"
import App from "../components/App"
import EditWord from "src/containers/Admin/EditWord"
import { withRouter } from "next/router";

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={'Edit domain'}>
        <EditWord />
      </App>
    )
  }
}

export default withRouter(RootIndex)
