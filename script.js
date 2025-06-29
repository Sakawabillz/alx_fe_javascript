// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Our array of quotes (initial set)
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Design" },
  { text: "JavaScript is the duct tape of the Internet.", category: "Programming" }
];

// Function: show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - (${quote.category})`;
}

// Function: add a new quote from user input
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please fill in both the quote and category.");
    return;
  }

  // Add to array
  quotes.push({ text: newText, category: newCategory });

  // Clear inputs
  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added successfully!");
}

// Event listener: show random quote on button click
newQuoteBtn.addEventListener("click", showRandomQuote);

// Show a quote immediately on page load
window.onload = () => {
  showRandomQuote();
};
