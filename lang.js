const fiButton = document.getElementById('finnish')
const enButton = document.getElementById('english')
const fiFlag = document.getElementById('finnishFlag').style
const enFlag = document.getElementById('englishFlag').style

const selectedStyle = '0px 0px 10px 5px #451299'
fiFlag.boxShadow = selectedStyle

const changeLanguage = (language, display) => {
  document.querySelectorAll(`[data-lang="${language}"]`).forEach(e => e.style.display = display)
}

fiButton.onclick = function () {
  if (document.documentElement.lang === 'fi') {
    return;
  }
  enFlag.boxShadow = ''
  fiFlag.boxShadow = selectedStyle
  document.documentElement.lang = 'fi'
  changeLanguage('fi', 'block')
  changeLanguage('en', 'none')
}

enButton.onclick = function () {
  if (document.documentElement.lang === 'en') {
    return;
  }
  fiFlag.boxShadow = ''
  enFlag.boxShadow = selectedStyle
  document.documentElement.lang = 'en'
  changeLanguage('en', 'block')
  changeLanguage('fi', 'none')
}
