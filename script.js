// DOM Elements
const quoteDisplay = document.getElementById("quoteDisplay");
const showQuoteBtn = document.getElementById("newQuote");

// Load quotes from localStorage or use fallback
function loadQuotesFromStorage() {
  // Explicitly load quotes using localStorage.getItem
  const storedQuotes = localStorage.getItem("quotes");
  return storedQuotes ? JSON.parse(storedQuotes) : [
    { text: "The best way to predict the future is to create it.", category: "Motivation" },
    { text: "Simplicity is the ultimate sophistication.", category: "Design" },
    { text: "JavaScript is the duct tape of the Internet.", category: "Programming" }
  ];
}

let quotes = loadQuotesFromStorage();

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  quoteDisplay.innerHTML = `"${randomQuote.text}" - (${randomQuote.category})`;
  sessionStorage.setItem("lastQuote", JSON.stringify(randomQuote));
}

// Add a new quote
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
  saveQuotes();
  populateCategories(); // Update dropdown with new category
  textInput.value = "";
  categoryInput.value = "";
  alert("Quote added!");
}

// Create Add Quote Form
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  const textInput = document.createElement("input");
  textInput.id = "newQuoteText";
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote";

  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.onclick = addQuote;

  formContainer.appendChild(textInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  document.body.appendChild(formContainer);
}

// Export to JSON
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
}

// Import from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        populateCategories(); // Update dropdown after import
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid file format.");
      }
    } catch (e) {
      alert("Error parsing file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// Populate categories for filtering
function populateCategories() {
  const select = document.getElementById("categoryFilter");
  if (!select) return;

  const uniqueCategories = [...new Set(quotes.map(q => q.category))];
  select.innerHTML = '<option value="all">All Categories</option>';
  uniqueCategories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    select.appendChild(option);
  });
}

// Filter quotes
function filterQuotes() {
  const category = document.getElementById("categoryFilter").value;
  const filtered = category === "all" ? quotes : quotes.filter(q => q.category === category);
  if (filtered.length > 0) {
    const quote = filtered[Math.floor(Math.random() * filtered.length)]; // Fixed typo
    quoteDisplay.innerHTML = `"${quote.text}" - (${quote.category})`;
  } else {
    quoteDisplay.innerHTML = "No quotes in this category.";
  }
  localStorage.setItem("lastCategory", category); // Save selected category
}

// Initial Load
window.onload = function () {
  const savedQuote = sessionStorage.getItem("lastQuote");
  if (savedQuote) {
    const quote = JSON.parse(savedQuote);
    quoteDisplay.innerHTML = `"${quote.text}" - (${quote.category})`;
  } else {
    showRandomQuote();
  }

  createAddQuoteForm();
  populateCategories(); // Populate dropdown on load

  const lastCategory = localStorage.getItem("lastCategory");
  if (lastCategory && document.getElementById("categoryFilter")) {
    document.getElementById("categoryFilter").value = lastCategory;
    filterQuotes(); // Apply last selected filter
  }
};

// Event listener for Show New Quote
showQuoteBtn.addEventListener("click", showRandomQuote);