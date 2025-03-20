const apiKey = "SUA_API_KEY"; // Substitua pela sua chave da ExchangeRate-API
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const exchangeRateText = document.getElementById("exchangeRate");
const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swap");

let exchangeRates = {};

// Carregar moedas na lista
async function loadCurrencies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        exchangeRates = data.conversion_rates;

        for (let currency in exchangeRates) {
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");

            option1.value = currency;
            option1.textContent = currency;
            option2.value = currency;
            option2.textContent = currency;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        }

        fromCurrency.value = "USD";
        toCurrency.value = "BRL";
    } catch (error) {
        console.error("Erro ao carregar moedas:", error);
    }
}

// Converter moeda
function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const value = parseFloat(amount.value);

    if (isNaN(value) || value <= 0) {
        alert("Digite um valor válido.");
        return;
    }

    const rate = exchangeRates[to] / exchangeRates[from];
    const convertedAmount = (value * rate).toFixed(2);
    result.value = convertedAmount;
    exchangeRateText.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
}

// Inverter moedas
swapBtn.addEventListener("click", () => {
    [fromCurrency.value, toCurrency.value] = [toCurrency.value, fromCurrency.value];
    convertCurrency();
});

// Converter ao clicar no botão
convertBtn.addEventListener("click", convertCurrency);

// Carrega moedas na inicialização
loadCurrencies();
