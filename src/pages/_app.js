import "typeface-quicksand";

import "antd/dist/antd.css";

import "src/styles/variables.scss";
import "src/styles/reset.scss";
import "src/styles/responsive.scss";
import "src/styles/classes.scss";
import "src/styles/layout.scss";
import "src/styles/antd.scss";
import "src/styles/ui.scss";
import "src/styles/loading.scss";

import React from "react";
import { Provider } from "react-redux";

import store from "src/redux/store";

// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css"
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core"
config.autoAddCss = false /* eslint-disable import/first */

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// ${(process.env.NODE_ENV==='development' ? 'src' : 'dist')}
