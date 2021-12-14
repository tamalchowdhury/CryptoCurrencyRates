import sampleData from '../../data/data.js'

const API_KEY = '4E6351C9-384C-4A47-B7A6-7E1E9651FEF6'
const endPoint =
  'https://rest-sandbox.coinapi.io/v1/assets?type_is_crypto=1&apikey=' + API_KEY

const LOCAL_MODE = true // So I don't keep using api requests

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

function populateResults(data) {
  document
    .querySelectorAll('.skeleton')
    .forEach((el) => (el.style.display = 'none'))

  data.forEach((item, index) => {
    let price = item.price_usd || 1
    let change = item.percent_change_24h || 'N/A'
    let change_percent = Math.sign(change)

    if (price < 100) {
      price = parseFloat(Math.round(price * 100) / 100).toFixed(2)
    } else {
      price = Math.round(price)
      price = numberWithCommas(price)
    }

    let changeClass
    let fontAwesome

    if (change_percent === 1) {
      changeClass = 'green'
      fontAwesome = 'fas fa-arrow-up'
    } else {
      changeClass = 'red'
    }

    let liItem = document.createElement('li')
    liItem.classList.add('item')
    //   Currency
    let currencyEl = document.createElement('span')
    currencyEl.classList.add('currency')
    currencyEl.textContent = `${index + 1}. ${item.name}`
    //   Price
    let priceEl = document.createElement('span')
    priceEl.classList.add('price')
    priceEl.textContent = price
    //   Change
    let changeEl = document.createElement('span')
    changeEl.classList.add('change')
    changeEl.textContent = change

    liItem.append(currencyEl, priceEl, changeEl)

    document.querySelector('ul').appendChild(liItem)
  })
}

function getDataFromAPI(apiEndpoint) {
  fetch(apiEndpoint)
    .then((res) => res.json())
    .then((data) => populateResults(data))
}

if (LOCAL_MODE) {
  populateResults(sampleData)
} else {
  getDataFromAPI(endPoint)
}
