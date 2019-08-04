var ws281x = require('rpi-ws281x-native')

var NUM_LEDS = 144

ws281x.init(NUM_LEDS)

ws281x.reset()
