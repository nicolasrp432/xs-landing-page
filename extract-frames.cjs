const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const videoPath = path.join(__dirname, 'public', 'video-scroll.mp4');
const framesDir = path.join(__dirname, 'public', 'frames');

if (!fs.existsSync(framesDir)) {
  fs.mkdirSync(framesDir, { recursive: true });
}

ffmpeg.ffprobe(videoPath, (err, metadata) => {
  if (err) {
    console.error('Error probing video:', err);
    process.exit(1);
  }

  const durationStr = metadata.format.duration;
  const fpsStr = metadata.streams[0].r_frame_rate;
  const [num, den] = fpsStr.split('/');
  const fps = Number(num) / Number(den);
  const duration = Number(durationStr);

  console.log(`Video detected: ${duration}s, ${fps} fps`);

  // Target between 150-300 frames. 
  const targetTotalFrames = 200;
  let targetFps = targetTotalFrames / duration;
  targetFps = Math.max(5, Math.min(fps, targetFps)); // Cap between 5 and original fps

  console.log(`Extracting at ~${targetFps.toFixed(2)} fps`);

  ffmpeg(videoPath)
    .outputOptions([
      `-vf fps=${targetFps.toFixed(2)},scale=1280:-1`,
      `-c:v libwebp`,
      `-quality 80`
    ])
    .output(path.join(framesDir, 'frame_%04d.webp'))
    .on('end', () => {
      console.log('Frame extraction complete.');
      // Keep only first 250 frames if we exceeded
      const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp')).sort();
      if(files.length > 250) {
         console.log(`Limiting to 250 frames. Deleting ${files.length - 250} excess frames.`);
         files.slice(250).forEach(f => fs.unlinkSync(path.join(framesDir, f)));
      }
      console.log(`Final frame count: ${Math.min(files.length, 250)}`);
    })
    .on('error', (err) => {
      console.error('Error extracting frames:', err);
    })
    .run();
});
