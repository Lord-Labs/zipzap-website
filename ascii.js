// Original static character art; the cutout illustrates a download.
export function sculptureFrame() {
  const rows = [];
  const ramp = ' .,:;+=xX#@';
  for (let row = 0; row < 38; row++) {
    let line = '';
    const y = (row - 18.5) / 17.2;
    for (let col = 0; col < 72; col++) {
      const x = (col - 35.5) / 31.5;
      const radius = x * x + y * y;
      if (radius > 1) { line += ' '; continue; }
      const arrow = (Math.abs(x) < .135 && y > -.5 && y < .19)
        || (y >= .08 && y < .59 && Math.abs(x) < (.59 - y) * .86)
        || (y > .69 && y < .76 && Math.abs(x) < .44);
      if (arrow) { line += ' '; continue; }
      const z = Math.sqrt(1 - radius);
      const longitude = Math.atan2(x, z);
      const bands = .5 + .5 * Math.sin(longitude * 17 + y * 10);
      const light = Math.max(0, z * .55 - x * .3 - y * .2 + bands * .24);
      line += ramp[Math.min(ramp.length - 1, Math.floor(light * ramp.length))];
    }
    rows.push(line);
  }
  return rows.join('\n');
}
