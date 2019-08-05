var ws281x = require('rpi-ws281x-native')

function defaultMode(ledArray, numberOfLEDs, brightness) {
  ws281x.init(numberOfLEDs)

  const pixelData = ledArray.map(led => {
    return rgb2Int(led.red, led.green, led.blue)
  })

  ws281x.setBrightness(brightness)
  ws281x.render(pixelData)
}

function rainbowMode(numberOfLEDs, brightness) {
  var pixelData = new Uint32Array(numberOfLEDs)

  ws281x.init(numberOfLEDs)

  for (var i = 0; i < numberOfLEDs; i += 1) {
    pixelData[i] = colorwheel(i)
  }
  ws281x.setBrightness(brightness)
  ws281x.render(pixelData)
}

function colorwheel(pos) {
  pos = 255 - pos
  if (pos < 85) {
    return rgb2Int(255 - pos * 3, 0, pos * 3)
  } else if (pos < 170) {
    pos -= 85
    return rgb2Int(0, pos * 3, 255 - pos * 3)
  } else {
    pos -= 170
    return rgb2Int(pos * 3, 255 - pos * 3, 0)
  }
}

function rgb2Int(r, g, b) {
  return ((r & 0xff) << 16) + ((g & 0xff) << 8) + (b & 0xff)
}

function turnOff(numberOfLEDs) {
  ws281x.init(numberOfLEDs)
  ws281x.reset()
}

module.exports = {
  turnOff,
  rainbowMode,
  defaultMode,
}
