import React from "react";
import App from "../components/App";
import Word from "src/containers/Word";

class RootIndex extends React.Component {
  render() {
    return (
      <App meta_title={"Thesaurus"}>
        <Word />
      </App>
    );
  }
}

export default RootIndex;
