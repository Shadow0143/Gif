





function exportVideo(blob) {
  console.log("Warning: Exported video may need to be fixed with CloudConvert.com or similar tools.");
 
  vid.src = URL.createObjectURL(blob);
  backgroundElem(vid);
  let extension = blob.type.split(';')[0].split('/')[1];

  function make_a() {
   
    a.href = vid.src;
  }
  vid.ontimeupdate = function () {
    this.ontimeupdate = () => {
      return;
    }
    make_a();
    vid.currentTime = 0;
  }
  make_a();
  vid.currentTime = Number.MAX_SAFE_INTEGER;
}




function getSupportedMimeTypes() {
  const VIDEO_TYPES = [
    "webm",
    "ogg",
    "mp4",
    "x-matroska"
  ];
  const VIDEO_CODECS = [
    "vp9",
    "vp9.0",
    "vp8",
    "vp8.0",
    "avc1",
    "av1",
    "h265",
    "h.265",
    "h264",
    "h.264",
    "opus",
  ];

  const supportedTypes = [];
  VIDEO_TYPES.forEach((videoType) => {
    const type = `video/${videoType}`;
    VIDEO_CODECS.forEach((codec) => {
      const variations = [
        `${type};codecs=${codec}`,
        `${type};codecs:${codec}`,
        `${type};codecs=${codec.toUpperCase()}`,
        `${type};codecs:${codec.toUpperCase()}`
      ]
      variations.forEach(variation => {
        if (MediaRecorder.isTypeSupported(variation))
          supportedTypes.push(variation);
      })
    });
    if (MediaRecorder.isTypeSupported(type)) supportedTypes.push(type);
  });
  return supportedTypes;
}



function download(ev) {
  console.log('Ev ====================', ev);

  if (player.layers.length == 0) {
    alert("Nothing to export.");
    return;
  }
 
  const chunks = [];
  const stream = player.canvas.captureStream();

  let has_audio = false;
  for (let layer of player.layers) {
    if (layer instanceof AudioLayer) {
      has_audio = true;
      break;
    }
  }
  if (has_audio) {
    let dest = player.audio_ctx.createMediaStreamDestination();
    player.audio_dest = dest;
    let tracks = dest.stream.getAudioTracks();
    stream.addTrack(tracks[0]);
  }
  const rec = new MediaRecorder(stream);
  rec.ondataavailable = e => chunks.push(e.data);
  const available_types = getSupportedMimeTypes();
  if (available_types.length == 0) {
    console.log("Cannot export! Please use a screen recorder instead.");
  }
  rec.onstop = e => exportVideo(new Blob(chunks, {
    type: available_types[0],
  }));
  player.pause();
  player.time = 0;
  player.play();
  rec.start();
  player.onend(function (p) {
    rec.stop();
    player.audio_dest = null;
    e.textContent = e_text;
    player.pause();
    player.time = 0;
  });
}