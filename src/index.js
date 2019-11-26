import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { videoMachine } from "./videoMachine";
import { Button, Timer } from "./Controls";
import { pauseVideo, playVideo } from "./actions";
import { useMachine } from "@xstate/react";

function App() {
  const ref = useRef(null);
  const machineCfg = { actions: { playVideo, pauseVideo } };
  const [current, send] = useMachine(videoMachine, machineCfg);
  // console.log({ref, current});

  return (
    <div className="sans-serif container">
      <video
        // src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        ref={ref}
        // controls // show video controls
        onCanPlay={() => send("LOADED", { video: ref.current })}
        onPlay={() => send("PLAY")}
        onError={() => send("FAIL")}
        onPause={() => send("PAUSE")}
        onTimeUpdate={() =>
          send("TIMING", { elapsed: ref.current.currentTime })
        }
        onEnd={() => send("END")}
      />
      <div>
        <Button current={current} send={send} />
        <Timer current={current} />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
