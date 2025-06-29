const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("newQuote");

// ✅ Required array format
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Design" },
  { text: "JavaScript is the duct tape of the Internet.", category: "Programming" }
];

// ✅ Required function name
function displayRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.textContent = `"${randomQuote.text}" - (${randomQuote.category})`;

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// ✅ Required function name
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please fill in both fields.");
    return;
  }

  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);

  localStorage.setItem("quotes", JSON.stringify(quotes));

  textInput.value = "";
  categoryInput.value = "";
  alert("Quote added!");
}

// ✅ Attach the event listener
showQuoteBtn.addEventListener("click", displayRandomQuote);

// ✅ Load a quote on page load
window.onload = function () {
  const saved = sessionStorage.getItem("lastQuote");
  if (saved) {
    const quote = JSON.parse(saved);
    quoteDisplay.textContent = `"${quote.text}" - (${quote.category})`;
  } else {
    displayRandomQuote();
  }
};
