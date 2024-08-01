const quoteContainer = document.getElementById("quote-container");
const quote = quoteContainer.querySelector(".rq__quote");
const author = quoteContainer.querySelector(".rq__author");
const category = document.getElementById("quote-category");
const newButton = document.getElementById("new-button");
const copyButton = document.getElementById("copy-button");

const url = "https://api.api-ninjas.com/v1/quotes";

newButton.addEventListener("click", handleNewButtonClick);

async function handleNewButtonClick() {
    const data = await fetchQuote();

    author.textContent = data.author;
    quote.textContent = data.quote;
    category.textContent = data.category
}

async function fetchQuote() {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "X-Api-Key": apiKey
            }
        });
        if (!response.ok) {
            throw new Error(`Error :${response.status}`);
        }

        const data = await response.json();
        return data[0];
    }
    catch (error) {
        console.log(error);
    }
}

