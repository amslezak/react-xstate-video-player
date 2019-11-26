export function playVideo(context, _event) {
  const { video } = context;
  video.play();
}

export function pauseVideo(context, _event) {
  const { video } = context;
  video.pause();
}

export function getDuration(_context, event) {
  const mins = Math.floor(event.video.duration / 60);
  const secs = Math.floor(event.video.duration % 60);

  return `${mins}:${secs}`;
}

export function getElapsed(_context, event) {
  const mins = Math.floor(event.elapsed / 60);
  const secs = ("0" + Math.floor(event.elapsed % 60)).slice(-2);

  return `${mins}:${secs}`;
}

export function getVideo(_context, event) {
  return event.video;
}
