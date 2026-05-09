const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const ffprobeStatic = require('ffprobe-static');

ffmpeg.setFfmpegPath(ffmpegStatic);
ffmpeg.setFfprobePath(ffprobeStatic.path);

const videoPath = 'public/video-scroll2.mp4';

ffmpeg.ffprobe(videoPath, (err, metadata) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const stream = metadata.streams.find(s => s.codec_type === 'video');
  const fps = stream.r_frame_rate.split('/').reduce((a,b) => a/b);
  console.log(JSON.stringify({
    width: stream.width,
    height: stream.height,
    duration: stream.duration,
    fps: fps,
    frames: stream.nb_frames || Math.round(stream.duration * fps)
  }, null, 2));
});
