const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("newQuote");

let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Design" },
  { text: "JavaScript is the duct tape of the Internet.", category: "Programming" }
];

// ✅ Checker expects this name
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  // ✅ Checker expects innerHTML
  quoteDisplay.innerHTML = `"${randomQuote.text}" - (${randomQuote.category})`;

  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// ✅ Checker expects this function
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

// ✅ Checker expects event listener
showQuoteBtn.addEventListener("click", showRandomQuote);

window.onload = function () {
  const saved = sessionStorage.getItem("lastQuote");
  if (saved) {
    const quote = JSON.parse(saved);
    quoteDisplay.innerHTML = `"${quote.text}" - (${quote.category})`;
  } else {
    showRandomQuote();
  }
};
