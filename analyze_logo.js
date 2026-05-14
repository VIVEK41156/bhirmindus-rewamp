const sharp = require('sharp');
const path = require('path');

async function analyzeLogoColors() {
  try {
    // 1. Convert AVIF → PNG for viewing
    const info = await sharp('src/assets/logo.avif')
      .png()
      .toFile('src/assets/logo_preview.png');
    
    console.log('✅ Converted to PNG:', JSON.stringify(info));

    // 2. Get raw pixel data for color analysis
    const { data, info: imgInfo } = await sharp('src/assets/logo.avif')
      .resize(200, 200, { fit: 'inside' })
      .raw()
      .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = imgInfo;
    console.log(`📐 Image: ${width}x${height} channels:${channels}`);

    // 3. Sample colors — collect unique colors
    const colorMap = {};
    for (let i = 0; i < data.length; i += channels * 4) { // sample every 4th pixel
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = channels === 4 ? data[i + 3] : 255;
      if (a < 30) continue; // skip near-transparent
      // Quantize to buckets of 20
      const rq = Math.round(r / 20) * 20;
      const gq = Math.round(g / 20) * 20;
      const bq = Math.round(b / 20) * 20;
      const key = `${rq},${gq},${bq}`;
      colorMap[key] = (colorMap[key] || 0) + 1;
    }

    // 4. Sort by frequency
    const sorted = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    console.log('\n🎨 Top 20 dominant colors (R,G,B → hex):');
    sorted.forEach(([rgb, count], i) => {
      const [r, g, b] = rgb.split(',').map(Number);
      const hex = '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
      console.log(`  ${i + 1}. ${hex}  (${rgb})  count:${count}`);
    });

  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

analyzeLogoColors();
