import sampleData from './data/data.js'

const API_KEY = '4E6351C9-384C-4A47-B7A6-7E1E9651FEF6'
const endPoint =
  'https://rest-sandbox.coinapi.io/v1/assets?type_is_crypto=1&apikey=' + API_KEY

const LOCAL_MODE = true // So I don't keep using api requests

$(() => {
  // Get data from live site
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  }

  function populateResults(data) {
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

      document
        .querySelectorAll('.skeleton')
        .forEach((el) => (el.style.display = 'none'))

      $('ul').append(`<li class="item">
                      <span class="currency">${index + 1}. ${item.name}</span>
                      <span class="price">$${price}</span>
                      <span class="change">
                      ${change}</span></li>`)
    })
  }

  function getDataFromAPI(apiEndpoint) {
    $.get(apiEndpoint, (data) => {
      populateResults(data)
    })
  }

  if (LOCAL_MODE) {
    populateResults(sampleData)
  } else {
    getDataFromAPI(endPoint)
  }
})
