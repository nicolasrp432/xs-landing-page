const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');
const path = require('path');
const fs = require('fs');

ffmpeg.setFfmpegPath(ffmpegStatic);

const videoPath = 'public/video-scroll2.mp4';
const outDir = 'public/frames';

// Ensure dir exists and is empty
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

console.log('Extracting frames...');

ffmpeg(videoPath)
  .outputOptions([
    '-vf fps=24,scale=1440:-1',
    '-c:v libwebp',
    '-quality 80'
  ])
  .output(path.join(outDir, 'frame_%04d.webp'))
  .on('end', () => {
    console.log('Extraction complete!');
  })
  .on('error', (err) => {
    console.error('Error:', err);
  })
  .run();
