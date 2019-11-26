import { Machine, assign } from "xstate";
import { getDuration, getElapsed, getVideo } from "./actions";

export const videoMachine = new Machine({
  id: "videoMachine",
  initial: "loading",
  context: { video: null, duration: `0:00`, elapsed: `0:00` },
  states: {
    loading: {
      on: {
        LOADED: {
          target: "ready",
          actions: assign({ video: getVideo, duration: getDuration })
        },
        FAIL: "failure"
      }
    },
    ready: {
      initial: "paused",
      states: {
        paused: { on: { PLAY: { target: "playing", actions: ["playVideo"] } } },
        playing: {
          on: {
            PAUSE: { target: "paused", actions: ["pauseVideo"] },
            END: "ended",
            TIMING: {
              target: "playing",
              actions: assign({ elapsed: getElapsed })
            }
          }
        },
        ended: { on: { PLAY: "playing" } }
      }
    },
    failure: { type: "final" }
  }
});
