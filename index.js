const Raspi = require('raspi-io').RaspiIO
const five = require('johnny-five')
const pixel = require('node-pixel')

const board = new five.Board({
  io: new Raspi(),
})

let strip = null

board.on('ready', () => {
  //   new five.Led('GPIO7').strobe()
  strip = new pixel.Strip({
    board: this,
    controller: 'FIRMATA',
    strips: [{ pin: 'GPIO7', length: 144 }],
    gamma: 2.8,
  })

  // Just like DOM-ready for web developers.
  strip.on('ready', function() {
    // Set the entire strip to pink.
    strip.color('#903')

    // Send instructions to NeoPixel.
    strip.show()
  })
})
