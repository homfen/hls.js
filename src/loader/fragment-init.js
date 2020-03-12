/*
 * Fragment init
 */

import Event from "../events";
import EventHandler from "../event-handler";
import { ErrorTypes } from "../errors";

class FragmentInit extends EventHandler {
  constructor(hls) {
    super(hls, Event.FRAG_LOADING_INIT);
  }

  onFragLoadingInit(data) {
    if (this.hls.onFragLoadingInit) {
      this.hls.onFragLoadingInit(data).then(
        data => {
          this.hls.trigger(Event.FRAG_LOADING_INITED, data);
        },
        err => {
          this.hls.trigger(Event.ERROR, {
            type: ErrorTypes.FRAG_INIT_ERROR,
            details: err,
            frag: data.frag
          });
        }
      );
    } else {
      this.hls.trigger(Event.FRAG_LOADING_INITED, data);
    }
  }
}

export default FragmentInit;
