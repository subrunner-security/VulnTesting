// Intentional XSS vulnerability

function renderSearchResult(search) {
  return "<div>Results for: " + search + "</div>";
}

function renderUserInput(userInput) {
  document.getElementById("output").innerHTML = userInput;
}

module.exports = { renderSearchResult, renderUserInput };
