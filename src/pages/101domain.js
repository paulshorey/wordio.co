import React from "react"
import App from "../components/App"
import Footer from "../components/Footer"
import About from "src/containers/About"
import Header from "../components/Header"

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={"Test 101Domain.com affiliate form"}>
        <Header standalone={true} />
        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <form
          id="Domain101Form"
          // style={{ display: "none" }}
          method="post"
          action="https://www.101domain.com/affiliate/bestadomains.htm"
          target="_blank"
        >
          <b className="color-light">Search 101Domain.com: </b>
          <input type="text" name="root" required id="Domain101Input" />
          <input type="hidden" name="action" value="search" />
          <input type="hidden" name="tld" value=".online" />
          <button type="submit">Search</button>
        </form>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </App>
    )
  }
}

export default RootIndex
