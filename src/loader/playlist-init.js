/*
 * Fragment init
 */

import Event from "../events";
import EventHandler from "../event-handler";
import { ErrorTypes } from "../errors";

class PlaylistInit extends EventHandler {
  constructor(hls) {
    super(hls, Event.LEVEL_LOADING_INIT);
  }

  onLevelLoadingInit(data) {
    if (this.hls.onLevelLoadingInit) {
      this.hls.onLevelLoadingInit(data).then(
        data => {
          this.hls.trigger(Event.LEVEL_LOADING_INITED, data);
        },
        err => {
          this.hls.trigger(Event.ERROR, {
            type: ErrorTypes.LEVEL_INIT_ERROR,
            details: err,
            frag: data.frag
          });
        }
      );
    } else {
      this.hls.trigger(Event.LEVEL_LOADING_INITED, data);
    }
  }
}

export default PlaylistInit;
