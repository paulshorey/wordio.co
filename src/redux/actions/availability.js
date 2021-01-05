import { v1_domains_availability } from "src/redux/actions/api/v1";
// import * as io_actions from "src/redux/actions/io"
// const sleep = function (ms = 0) {
//   return new Promise((r) => setTimeout(r, ms));
// };
let DEBUG1 = false;

let timeout_availability;
export function RX__domains_availability() {
  return async (dispatch, getState) => {
    /*
     * debounce this
     */
    clearTimeout(timeout_availability);
    timeout_availability = setTimeout(function () {
      /*
       * Incremental lists of domains to check (from domains_availability_queue dict)
       */
      let { input, output } = getState();
      let { domains_availability_queue, domains_availability } = output;
      console.log("domains_availability_queue", domains_availability_queue);
      let check_doms = [];
      for (let dom in domains_availability_queue) {
        if (!domains_availability[dom]) {
          check_doms.push(dom);
        }
      }
      if (check_doms.length < 3) {
        return;
      }
      console.log("check_doms", check_doms);
      dispatch({
        type: "RX__domains_availability_queue_clear"
      });

      /*`
       * Make flat list of domain names to POST
       */
      let suggestions = check_doms;

      /*
       * Fix domains
       */
      // unique
      suggestions = [...new Set(suggestions)];
      suggestions = suggestions.filter((str) => !domains_availability[str]); // only if not already checked
      suggestions = suggestions.map((str) => str.replace(/ /g, ""));
      /*
       * Fetch availability of each suggestion string
       * (50 at a time)
       */
      if (suggestions.length) {
        // let suggestions_slice = suggestions
        // suggestions = suggestions.slice(0,100) // debug limited list
        let i_page = 0;
        let n_page = 100; //Math.max(60, Math.ceil(suggestions.length / 6)) // browser allows 6 concurrent connections
        while (i_page * n_page < Math.min(suggestions.length, 300)) {
          setTimeout(
            function () {
              if (DEBUG1) console.warn("check availability", i_page, i_page * n_page, suggestions.length);
              let start = this.i_page * this.n_page;
              let end = this.i_page * this.n_page + this.n_page;
              let suggestions_slice = suggestions.slice(start, end);
              if (suggestions_slice.length) {
                let params = {
                  options: {},
                  domains: suggestions_slice,
                  recaptcha2_token: input.captcha2,
                  recaptcha3_token: input.captcha3
                };
                // if (DEBUG1) console.warn("send                        v1_domains_availability")
                // console.timeEnd("/ds")
                // console.time("/ds")
                if (DEBUG1) console.warn("sending v1_domains_availability()");
                v1_domains_availability(params).then((data = {}) => {
                  if (data.status) {
                    if (DEBUG1) console.warn("received v1_domains_availability( alt= true )", data);
                    // save
                    dispatch({
                      type: "RX__domains_availability",
                      data: data.status
                    });
                    /*
                     * IF USE_CLI, AND NOT FOUND, TRY AGAIN
                     * run same API endpoint again, but this time without CLI PING
                     */
                    // let try_again_arr = []
                    // // look at all INPUT dict
                    // for (let domname of suggestions_slice) {
                    //   // see if it exists in the OUTPUT dict
                    //   if (
                    //     !data.status[domname] ||
                    //     (data.status[domname].length && !data.status[domname][0])
                    //   ) {
                    //     // missing! try again!
                    //     try_again_arr.push(domname)
                    //   }
                    // }
                    // if (try_again_arr.length) {
                    //   params.domains = try_again_arr // check only the missing ones
                    // }
                  }
                });
                // setTimeout(() => {
                //   if (DEBUG1) console.warn("sending v1_domains_availability( 2ND TRY )")
                //   params.options.use_alt_source = this.i_page === 0 ? false : true
                //   v1_domains_availability(params).then((data) => {
                //     if (data && typeof data === "object" && "availability" in data) {
                //       if (DEBUG1) console.warn("received v1_domains_availability( alt= false )", data)
                //       // save
                //       dispatch({
                //         type: "RX__domains_availability",
                //         data: data.status
                //       })
                //     }
                //   })
                // }, 1000)
              }
            }.bind({ i_page, n_page }),
            i_page * 2000
          );
          i_page++;
        }
      }
    }, 300);
  };
}
