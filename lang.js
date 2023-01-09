const fiButton = document.getElementById('finnish')
const enButton = document.getElementById('english')
const fiFlag = document.getElementById('finnishFlag').style
const enFlag = document.getElementById('englishFlag').style
const info = document.getElementById('info')
const fiInfo = document.getElementById('fiInfo')
const enInfo = document.getElementById('enInfo')
const fiLanding = document.getElementById('fiLanding')
const enLanding = document.getElementById('enLanding')

let isFinnish = true
const selectedStyle = '0px 0px 10px 5px #451299'
fiFlag.boxShadow = selectedStyle

const setToFinnish = () => {
  enFlag.boxShadow = ''
  fiFlag.boxShadow = selectedStyle
  isFinnish = true
  document.documentElement.lang = 'fi'
  fiInfo.style.display = 'block'
  fiLanding.style.display = 'block'
  enInfo.style.display = 'none'
  enLanding.style.display = 'none'
}

const setToEnglish = () => {
  fiFlag.boxShadow = ''
  enFlag.boxShadow = selectedStyle
  isFinnish = false
  document.documentElement.lang = 'en'
  enInfo.style.display = 'block'
  enLanding.style.display = 'block'
  fiInfo.style.display = 'none'
  fiLanding.style.display = 'none'
}

fiButton.onclick = function () {
  if (!isFinnish) {
    setToFinnish()
  }
}

enButton.onclick = function () {
  if (isFinnish) {
    setToEnglish()
  }
}
