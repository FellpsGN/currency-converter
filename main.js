const form = document.querySelector("form")
const amountInput = document.getElementById("amount")
const fromCurrency = document.getElementById("currency-from")
const toCurrency = document.getElementById("currency-to")
const footer = document.querySelector("footer")

const description = document.getElementById("description")
const result = document.getElementById("result")

const hasCharactersRegex = /[^\d,]+/g


async function fetchCurrencies(from, to) {
    const urlCurrency = `https://economia.awesomeapi.com.br/json/last/${from}-${to}`
    const response = await fetch(urlCurrency)
    const data = await response.json()
    return data
}

function getExchangeRate(data, from, to) {
    const bid = parseFloat(data[`${from}${to}`].bid)
    return bid
}

function updateResult(amount, from, converted, to) {
    footer.style.display = "block"
    description.textContent = `${amount} ${from} = ${converted} ${to}`
    result.textContent = `${converted} ${toCurrency.value}`      
}

async function convertCurrency(amountInput) {

    try {
        const data = await fetchCurrencies(fromCurrency.value, toCurrency.value)
        const bid = getExchangeRate(data, fromCurrency.value, toCurrency.value)

        const converted = (bid * parseFloat(amountInput)).toFixed(2)
        
        updateResult(amountInput, fromCurrency.value, converted, toCurrency.value)
    
    } catch(error) {
        alert("Não foi possível converter a moeda")
    }
}



amountInput.addEventListener("input", () => {
    amount.value = amount.value.replace(hasCharactersRegex, "")
})


form.onsubmit = (event) => {
    event.preventDefault()
    if(fromCurrency.value && toCurrency.value && amount.value) {
        convertCurrency(amount.value)
    }
}


