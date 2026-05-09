const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');
const ffprobePath = require('ffprobe-static').path;
const fs = require('fs');
const path = require('path');

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

const videoPath = path.join(__dirname, '..', 'public', 'video_scroll_2.mp4');
const framesDir = path.join(__dirname, '..', 'public', 'frames');

// Limpiar frames existentes
if (fs.existsSync(framesDir)) {
  const files = fs.readdirSync(framesDir);
  for (const file of files) {
    if (file.endsWith('.webp')) {
      fs.unlinkSync(path.join(framesDir, file));
    }
  }
} else {
  fs.mkdirSync(framesDir);
}

// Analizar y extraer
ffmpeg(videoPath).ffprobe((err, data) => {
  if (err) {
    console.log('No se pudo obtener ffprobe asumiendo 30fps y 15s de duracion (extraer a 12fps):', err.message);
    // Extraer sin ffprobe
    extract(12);
    return;
  }
  
  const stream = data.streams.find(s => s.codec_type === 'video');
  const duration = stream.duration || data.format.duration;
  console.log('Duracion:', duration);
  
  // Queremos entre 150 y 200 frames
  // fps = target_frames / duration
  let fps = 150 / duration;
  if (fps > 24) fps = 24;
  if (fps < 5) fps = 5;
  fps = Math.round(fps);
  
  console.log('Extrayendo a fps:', fps);
  extract(fps);
});

function extract(fps) {
  console.log('Iniciando extracción a ' + fps + ' fps...');
  ffmpeg(videoPath)
    .outputOptions([
      '-vf', `fps=${fps},scale='min(1920,iw)':-1`,
      '-c:v', 'libwebp',
      '-quality', '80'
    ])
    .output(path.join(framesDir, 'frame_%04d.webp'))
    .on('end', () => {
      const files = fs.readdirSync(framesDir).filter(f => f.endsWith('.webp'));
      console.log(`Finalizado. Frames extraídos: ${files.length}`);
    })
    .on('error', (err) => {
      console.error('Error durante extracción:', err);
    })
    .run();
}
