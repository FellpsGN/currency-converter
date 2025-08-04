const form = document.querySelector("form")
const amountInput = document.getElementById("amount")
const fromCurrency = document.getElementById("currency-from")
const toCurrency = document.getElementById("currency-to")
const footer = document.querySelector("footer")

const description = document.getElementById("description")
const result = document.getElementById("result")

const hasCharactersRegex = /\D+/g

async function convertCurrency(amountInput) {
    try {
        const urlCurrency = `https://economia.awesomeapi.com.br/json/last/${fromCurrency.value}-${toCurrency.value}`
        const response = await fetch(urlCurrency)
        const data = await response.json()
        console.log(data)
        const bid = parseFloat(data[`${fromCurrency.value}${toCurrency.value}`].bid)
        const converted = (bid * parseFloat(amountInput)).toFixed(2)
        
        console.log(`Valor convertido: ${converted}`)
        
        footer.style.display = "block"
        description.textContent = `${amountInput} ${fromCurrency.value} = ${converted} ${toCurrency.value}`
        result.textContent = `${converted} ${toCurrency.value}`
    
    } catch(error) {
        console.error("Erro ao converter moeda:", error)
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


