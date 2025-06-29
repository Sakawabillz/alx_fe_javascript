const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");

// Load quotes from localStorage or use default
let quotes = JSON.parse(localStorage.getItem("quotes")) || [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Simplicity is the ultimate sophistication.", category: "Design" },
  { text: "JavaScript is the duct tape of the Internet.", category: "Programming" }
];

// Show a random quote and save it to sessionStorage
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" - (${quote.category})`;

  sessionStorage.setItem("lastQuote", JSON.stringify(quote));
}

// Add a quote from user input
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text: newText, category: newCategory });
  localStorage.setItem("quotes", JSON.stringify(quotes));

  textInput.value = "";
  categoryInput.value = "";

  alert("Quote added!");
}

// Export quotes to JSON file
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

// Import quotes from uploaded JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        quotes.push(...imported);
        localStorage.setItem("quotes", JSON.stringify(quotes));
        alert("Quotes imported!");
      } else {
        alert("Invalid file format.");
      }
    } catch {
      alert("Failed to import quotes.");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

// Load last viewed quote from sessionStorage
function loadLastViewedQuote() {
  const saved = sessionStorage.getItem("lastQuote");
  if (saved) {
    const quote = JSON.parse(saved);
    quoteDisplay.textContent = `"${quote.text}" - (${quote.category})`;
  } else {
    showRandomQuote();
  }
}

newQuoteBtn.addEventListener("click", showRandomQuote);

window.onload = function () {
  loadLastViewedQuote();
};
