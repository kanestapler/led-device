const { firebase } = require('./firebase')
const { getLEDArray } = require('./conversion')
const { turnOff, rainbowMode, defaultMode } = require('./ledController')

const firestore = firebase.firestore()

const LIGHT_ID = 'iA9aSpCpVqcELnm0yo6A'

firestore
  .collection('lights')
  .doc(LIGHT_ID)
  .onSnapshot(doc => {
    const lightData = doc.data()
    updateLight(lightData)
  })

const updateLight = light => {
  if (!light.power) {
    console.log('off')
    turnOff()
    exitProcess()
  }
  if (light.mode === 'default') {
    const LEDArray = getLEDArray(light.colors, light.numberOfLEDs)
    console.log('default')
    console.log(LEDArray)
    defaultMode(LEDArray, light.numberOfLEDs, light.brightness)
    exitProcess()
  } else if (light.mode === 'party') {
  } else if (light.mode === 'rainbow') {
    console.log('rainbow')
    rainbowMode(light.numberOfLEDs, light.brightness)
    exitProcess()
  }
}

const exitProcess = () => {
  process.exit(0)
}
