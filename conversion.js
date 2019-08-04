const getLEDArray = (colors, numberOfLEDs) => {
  const ledArray = []
  if (colors.length === 0) {
    for (let i = 0; i < numberOfLEDs; i++) {
      ledArray.push({
        red: 0,
        green: 0,
        blue: 0,
      })
    }
  } else if (colors.length === 1) {
    for (let i = 0; i < numberOfLEDs; i++) {
      ledArray.push({
        red: colors[0].red,
        green: colors[0].green,
        blue: colors[0].blue,
      })
    }
  } else {
    for (let i = 0; i < numberOfLEDs; i++) {
      const interval = numberOfLEDs / (colors.length - 1)
      const arrayIndex = Math.floor(i / interval)
      ledArray.push(getColorAtIndex(colors, i % interval, arrayIndex, interval))
    }
  }
  return ledArray
}

const getColorAtIndex = (colors, index, arrayIndex, interval) => {
  const red = getSingleValue(
    index,
    colors[arrayIndex].red,
    colors[arrayIndex + 1].red,
    interval
  )
  const blue = getSingleValue(
    index,
    colors[arrayIndex].blue,
    colors[arrayIndex + 1].blue,
    interval
  )
  const green = getSingleValue(
    index,
    colors[arrayIndex].green,
    colors[arrayIndex + 1].green,
    interval
  )
  return {
    red,
    blue,
    green,
  }
}

const getSingleValue = (index, startValue, endValue, periodLength) => {
  if (startValue < endValue) {
    return (index / periodLength) * (endValue - startValue) + startValue
  } else if (endValue < startValue) {
    return (
      ((periodLength - index) / periodLength) * (startValue - endValue) +
      endValue
    )
  } else {
    return startValue
  }
}

module.exports = {
  getLEDArray,
}
