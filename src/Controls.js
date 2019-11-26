import React from "react";

export function Timer({ current }) {
  return (
    <>
      {current.context.elapsed} / {current.context.duration}
    </>
  );
}

export function Button({ current, send }) {
  return current.matches({ ready: "playing" }) ? (
    <button onClick={() => send("PAUSE")}>pause</button>
  ) : (
    <button onClick={() => send("PLAY")}>play</button>
  );
}
